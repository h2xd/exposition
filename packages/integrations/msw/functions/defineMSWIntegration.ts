import type { GraphQLHandler, RestHandler, SetupWorkerApi } from 'msw'
import type { SetupServerApi } from 'msw/node'
import type { ExpositionConfig, ExpositionState, ExpositionValues } from '@exposition/core'
import { getExpositionValues } from '@exposition/core'

type Handler = RestHandler | GraphQLHandler
type HandlerCreationFn<T extends ExpositionState<ExpositionConfig>> = (expositionValues: ExpositionValues<T>) => Handler[]

interface IntegrationOptions<T extends ExpositionState<ExpositionConfig>> {
  msw: SetupServerApi | SetupWorkerApi
  handlers?: HandlerCreationFn<T>[]
  exposition: T
}

export function defineMSWIntegration<T extends ExpositionState<ExpositionConfig>>(options: IntegrationOptions<T>) {
  const { msw, handlers = [], exposition } = options

  const internalHandler: HandlerCreationFn<T>[] = []

  async function init(): Promise<void> {
    return resetValues()
  }

  function assignHandler(values: ExpositionValues<T>): void {
    const handlerList = [...internalHandler, ...handlers].reduce((accumulator, handler) => {
      return [
        ...accumulator,
        ...handler(values),
      ]
    }, [] as Handler[])

    msw.use(...handlerList)
  }

  function useNoHandlers(): void {
    msw.resetHandlers()
    msw.use()
  }

  function createHandler(handler: (values: ExpositionValues<T>) => Handler[]): void {
    internalHandler.push(handler)
  }

  function updateValues<TValues extends ExpositionValues<T>>(newValues: TValues): void {
    assignHandler(newValues)
  }

  function resetValues(): void {
    assignHandler(getExpositionValues(exposition))
  }

  return {
    createHandler,
    updateValues,
    useNoHandlers,
    resetValues,
    init,
  }
}
