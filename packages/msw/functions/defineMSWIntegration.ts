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

  function init() {
    resetValues()
  }

  function assignHandler(values: ExpositionValues<T>) {
    try {
      const handlerList = [...internalHandler, ...handlers].reduce((accumulator, handler) => {
        return [
          ...accumulator,
          ...handler(values),
        ]
      }, [] as RestHandler[])

      msw.use(...handlerList)
    }
    catch (e) {
      console.error(e)
    }
  }

  function createHandler(handler: (values: ExpositionValues<T>) => RestHandler[]): void {
    internalHandler.push(handler)
  }

  function updateValues<TValues extends ExpositionValues<T>>(newValues: TValues) {
    assignHandler(newValues)
  }

  function resetValues() {
    assignHandler(getExpositionValues(exposition))
  }

  return {
    createHandler,
    updateValues,
    resetValues,
    init,
  }
}
