import type { ExpositionState, ExpositionValues } from '../@types/exposition'
import { isScenario } from '../utils/guards'

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
    const state = expositionState[key]

    if (isScenario(state)) {
      return {
        ...accumulator,
        [key]: state.initialValue,
      }
    }

    return {
      ...accumulator,
      [key]: getInitialExpositionValues(state),
    }
  }, {} as ExpositionValues<T>)
}
