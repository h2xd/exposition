import type { GraphQLHandler, RestHandler, SetupWorkerApi } from 'msw'
import type { SetupServerApi } from 'msw/node'
import type { Exposition } from '@exposition/core'
import type { ExpositionConfig, ExpositionState, ExpositionValues } from '@exposition/sdk'

type Handler = RestHandler | GraphQLHandler
type HandlerCreationFn<T extends ExpositionState<ExpositionConfig>> = (expositionValues: ExpositionValues<T>) => Handler[]

interface IntegrationOptions {
  msw: SetupServerApi | SetupWorkerApi
}

function isServer(msw: SetupServerApi | SetupWorkerApi): msw is SetupServerApi {
  // @ts-expect-error - we check whenever the give type is as server by checking for the listen function
  return !!msw.listen
}

export function createMswIntegration<T extends Exposition<any>>(context: T, settings: IntegrationOptions) {
  const internalHandler: HandlerCreationFn<T['values']>[] = []

  function assignHandler(values: T['values']): void {
    clearHandler()
    const handlerList = internalHandler.reduce((accumulator, handler) => {
      return [
        ...accumulator,
        ...handler(values),
      ]
    }, [] as Handler[])

    settings.msw.use(...handlerList)
  }

  function clearHandler() {
    settings.msw.resetHandlers()
  }

  context.on('initialized', () => {
    assignHandler(context.values)

    if (isServer(settings.msw))
      settings.msw.listen()
    else
      settings.msw.start()
  })

  context.on('update', assignHandler).on('reset', assignHandler)
  context.on('updateSettings', (values, { active }) => {
    if (!active) {
      clearHandler()
      return
    }

    assignHandler(values)
  })

  function createHandler(handler: (values: T['values']) => Handler[]): void {
    internalHandler.push(handler)
  }

  return {
    createHandler,
  }
}
