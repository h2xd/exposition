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

export function createMswIntegration<T extends Exposition<any>>() {
  // function useNoHandlers(): void {
  //   settings.msw.resetHandlers()
  //   settings.msw.use()
  // }

  const internalHandler: HandlerCreationFn<T['values']>[] = []

  function createHandler(handler: (values: T['values']) => Handler[]): void {
    internalHandler.push(handler)
  }

  return {
    createHandler,
    install(context: T, settings: IntegrationOptions) {
      function assignHandler(values: T['values']): void {
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

      return {
        createHandler,
      }
    },
  }
}
