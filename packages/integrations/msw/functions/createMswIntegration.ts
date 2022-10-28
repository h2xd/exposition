import type { GraphQLHandler, RestHandler, SetupWorkerApi } from 'msw'
import type { SetupServerApi } from 'msw/node'
import type { Exposition } from '@exposition/core'
import type { ExpositionConfig, ExpositionState, ExpositionValues } from '@exposition/sdk'

type Handler = RestHandler | GraphQLHandler
type HandlerCreationFn<T extends ExpositionState<ExpositionConfig>, TC extends Object> = (expositionValues: ExpositionValues<T>, config: TC) => Handler[]

interface IntegrationOptions<TC extends Object = {}> {
  msw: SetupServerApi | SetupWorkerApi
  config?: TC
}

function isServer(msw: SetupServerApi | SetupWorkerApi): msw is SetupServerApi {
  // @ts-expect-error - we check whenever the give type is as server by checking for the listen function
  return !!msw.listen
}

/**
 * Create a MSW integration on top of the given Exposition config
 *
 * {@link https://mswjs.io/|MSW} | {@link https://h2xd.github.io/exposition/cookbook/setup-msw.html|🥘 Cookbook}
 * @param exposition - Exposition instance that interconnects with MSW
 * @param settings - Settings for the MSW instance
 *
 * @example - Simple Setup {@link https://h2xd.github.io/exposition/cookbook/setup-msw.html#create-exposition|🥘 Cookbook}
 * import { Exposition } from '@exposition/core'
 * import { setupServer } from 'msw/node'
 * const exposition = new Exposition({ ...options })
 *
 * const mswIntegration = createMswIntegration(exposition, {
 *   msw: setupServer(),
 *   // optional config that will be passed into the `createHandler` function
 *   config: {
 *     baseUrl: '',
 *     // ... other custom key/value pairs
 *   }
 * })
 *
 * exposition.init()
 */
export function createMswIntegration<T extends Exposition<any>, TC extends Object = {}>(exposition: T, settings: IntegrationOptions<TC>) {
  const internalHandler: HandlerCreationFn<T['values'], TC>[] = []

  function assignHandler(values: T['values']): void {
    clearHandler()
    const handlerList = internalHandler.reduce((accumulator, handler) => {
      return [
        ...accumulator,
        ...handler(values, settings.config || {} as TC),
      ]
    }, [] as Handler[])

    settings.msw.use(...handlerList)
  }

  function clearHandler() {
    settings.msw.resetHandlers()
  }

  exposition.on('initialized', () => {
    assignHandler(exposition.values)

    if (isServer(settings.msw))
      settings.msw.listen()
    else
      settings.msw.start()
  })

  exposition.on('update', assignHandler).on('reset', assignHandler)
  exposition.on('updateSettings', (values, { active }) => {
    if (!active) {
      clearHandler()
      return
    }

    assignHandler(values)
  })

  return {
    /**
     * Custom handler function to create dynamic MSW interceptors
     * @params {HandlerCreationFn} handler
     * @example
     * const mswIntegration = createMswIntegration(exposition, {
     *   msw: setupServer(),
     *   config: {
     *     baseUrl: 'https://api.example.com'
     *     // ... other custom key/value pairs
     *   }
     * })
     *
     * // The handler function provides the following values
     * // 1. parameter - the current scenario values form the given Exposition instance
     * // 2. parameter - the above defined custom config option
     * mswIntegration.createHandler((values, config) => {
     *   return [
     *     rest.get(`${config.baseUrl}/dog`, (_request, response, context) => {
     *       switch (values.scenario) {
     *         case '1':
     *           //
     *         case '2':
     *           //
     *       }
     *     }),
     *   ]
     * })
     */
    createHandler(handler: HandlerCreationFn<T['values'], TC>): void {
      internalHandler.push(handler)
    }
  }
}
