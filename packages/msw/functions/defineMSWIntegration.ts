import type { RestHandler, SetupWorkerApi } from 'msw'
import type { SetupServerApi } from 'msw/node'
import type { Exposition, ExpositionConfig, ExpositionValues } from '@exposition/core'
import { getExpositionValues } from '@exposition/core'

type HandlerCreationFn<T extends Exposition<ExpositionConfig>> = (expositionValues: ExpositionValues<T>) => RestHandler[]

interface IntegrationOptions<T extends Exposition<ExpositionConfig>> {
  msw: SetupServerApi | SetupWorkerApi
  handlers?: HandlerCreationFn<T>[]
  exposition: T
}

export function defineMSWIntegration<T extends Exposition<ExpositionConfig>>(options: IntegrationOptions<T>) {
  const { msw, handlers = [], exposition } = options

  const internalHandler: HandlerCreationFn<T>[] = []

  async function init(): Promise<void> {
    return resetValues()
  }

  async function assignHandler(values: ExpositionValues<T>, delay = 10): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const handlerList = [...internalHandler, ...handlers].reduce((accumulator, handler) => {
          return [
            ...accumulator,
            ...handler(values),
          ]
        }, [] as RestHandler[])

        msw.use(...handlerList)

        /**
         * Important! 🧦
         * MSW seems to need some time to apply all handler.
         * For that we mimic a `nextTick` functionality that exists in your
         * favorite Frontend Framework.
         * BUT, with a much simpler approach.
         */
        setTimeout(resolve, delay)
      }
      catch (error) {
        console.error(error)
        reject(error)
      }
    })
  }

  function createHandler(handler: (values: ExpositionValues<T>) => RestHandler[]): void {
    internalHandler.push(handler)
  }

  async function updateValues<TValues extends ExpositionValues<T>>(newValues: TValues): Promise<void> {
    return assignHandler(newValues)
  }

  async function resetValues(): Promise<void> {
    return assignHandler(getExpositionValues(exposition))
  }

  return {
    createHandler,
    updateValues,
    resetValues,
    init,
  }
}
