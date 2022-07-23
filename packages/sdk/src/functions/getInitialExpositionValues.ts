import type { ExpositionState, ExpositionValues } from '../@types/exposition'

/**
 * Extract the initials values from a given `ExpositionState`. 🦖
 *
 * @param expositionState
 * @returns ExpositionValues
 * @example
  const expositionState = createExpositionState({
    progress: {
      options: [
        '🐛 Small',
        '🦋 Big',
      ],
    },
  })

  const updatedExposition = updateExpositionValues(expositionState, { progress: '🦋 Big' })

  getInitialExpositionValues(updatedExposition) // { progress: "🐛 Small" }
 */
export function getInitialExpositionValues<T extends ExpositionState<any>>(expositionState: T): ExpositionValues<T> {
  return Object.keys(expositionState).reduce((accumulator, key) => {
    const scenario = expositionState[key]

    return {
      ...accumulator,
      [key]: scenario.initialValue,
    }
  }, {} as ExpositionValues<T>)
}
