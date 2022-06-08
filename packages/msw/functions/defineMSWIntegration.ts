import type { DefaultBodyType, MockedRequest, RestHandler, setupWorker } from 'msw'
import type { setupServer } from 'msw/node'
import type { Exposition, ExpositionConfig, ExpositionValues } from '@exposition/core'
import { getExpositionValues } from '@exposition/core'

interface IntegrationOptions<T extends Exposition<ExpositionConfig>> {
  msw: ReturnType<typeof setupWorker> | ReturnType<typeof setupServer>
  handlers: ((expositionValues: ExpositionValues<T>) => RestHandler<MockedRequest<DefaultBodyType>>)
  exposition: T
}

export function defineMSWIntegration<T extends Exposition<ExpositionConfig>>(options: IntegrationOptions<T>) {
  const { msw, handlers, exposition } = options

  msw.use(handlers(getExpositionValues(exposition)))

  function updateValues<TValues extends ExpositionValues<T>>(newValues: TValues) {
    msw.use(handlers(newValues))
  }

  function resetValues() {
    msw.use(handlers(getExpositionValues(exposition)))
  }

  return {
    updateValues,
    resetValues,
  }
}
