import type { RequestHandler, SetupWorkerApi } from 'msw'
import type { SetupServerApi } from 'msw/node'
import type { Exposition, ExpositionConfig, ExpositionValues } from '@exposition/core'
import { getExpositionValues } from '@exposition/core'

interface IntegrationOptions<T extends Exposition<ExpositionConfig>> {
  msw: SetupServerApi | SetupWorkerApi
  handlers: ((expositionValues: ExpositionValues<T>) => RequestHandler[])[]
  exposition: T
}

export function defineMSWIntegration<T extends Exposition<ExpositionConfig>>(options: IntegrationOptions<T>) {
  const { msw, handlers, exposition } = options

  function main() {
    console.log('reset')
    resetValues()
  }

  function assignHandler(values: ExpositionValues<T>) {
    try {
      const handlerList = handlers.reduce((accumulator, handler) => {
        return [
          ...accumulator,
          ...handler(values),
        ]
      }, [] as RequestHandler[])

      console.log({ handlerList })

      msw.use(...handlerList)
    }
    catch (e) {
      console.error(e)
    }
  }

  function updateValues<TValues extends ExpositionValues<T>>(newValues: TValues) {
    assignHandler(newValues)
  }

  function resetValues() {
    assignHandler(getExpositionValues(exposition))
  }

  main()

  return {
    updateValues,
    resetValues,
  }
}
