import type { GraphQLHandler, RestHandler, SetupWorkerApi } from 'msw'
import type { SetupServerApi } from 'msw/node'
import type { Exposition, ExpositionConfig, ExpositionState, ExpositionValues } from '@exposition/core'

type Handler = RestHandler | GraphQLHandler
type HandlerCreationFn<T extends ExpositionState<ExpositionConfig>> = (expositionValues: ExpositionValues<T>) => Handler[]

interface IntegrationOptions {
  msw: SetupServerApi | SetupWorkerApi
}

function isServer(msw: SetupServerApi | SetupWorkerApi): msw is SetupServerApi {
  // @ts-expect-error - we check whenever the give type is as server by checking for the listen function
  return !!msw.listen
}

// function useNoHandlers(): void {
//   settings.msw.resetHandlers()
//   settings.msw.use()
// }

export function createMswIntegration<T extends Exposition<any>>(context: T, settings: IntegrationOptions) {
  type Values = T['values']

  const internalHandler: HandlerCreationFn<Values>[] = []

  function assignHandler(values: Values): void {
    const handlerList = internalHandler.reduce((accumulator, handler) => {
      return [
        ...accumulator,
        ...handler(values),
      ]
    }, [] as Handler[])

    settings.msw.use(...handlerList)
  }

  context.on('initialized', () => {
    assignHandler(context.values)

    if (isServer(settings.msw))
      settings.msw.listen()
    else
      settings.msw.start()
  })

  context.on('afterUpdate', assignHandler).on('afterReset', assignHandler)

  function createHandler(handler: (values: Values) => Handler[]): void {
    internalHandler.push(handler)
  }

  return {
    createHandler,
  }
}
