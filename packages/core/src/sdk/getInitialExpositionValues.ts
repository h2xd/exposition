import type { ExpositionState, ExpositionValues } from './@types/exposition'

export function getInitialExpositionValues<T extends ExpositionState<any>>(expositionState: T): ExpositionValues<T> {
  return Object.keys(expositionState).reduce((accumulator, key) => {
    const scenario = expositionState[key]

    return {
      ...accumulator,
      [key]: scenario.initialValue,
    }
  }, {} as ExpositionValues<T>)
}
