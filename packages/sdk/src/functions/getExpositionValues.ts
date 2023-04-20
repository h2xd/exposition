import type { ExpositionState, ExpositionValues } from '../@types/exposition'
import { isScenario } from '../utils/guards'

/**
 * Extract the current values from a given `ExpositionState`. 📃
 *
 * @param expositionState
 * @returns ExpositionValues
 * @example
  const expositionState = createExpositionState({
    base: {
      options: [
        '🍚 Rice - Cool',
        '🍝 Pasta - Mama Mia',
      ],
    },
  })

  getExpositionValues(expositionState) // { base: "🍚 Rice - Cool" }
 */
export function getExpositionValues<T extends ExpositionState<any>>(expositionState: T): ExpositionValues<T> {
  return Object.keys(expositionState).reduce((accumulator, key) => {
    const state = expositionState[key]

    if (isScenario(state)) {
      return {
        ...accumulator,
        [key]: state.value,
      }
    }

    return {
      ...accumulator,
      [key]: getExpositionValues(state),
    }
  }, {} as ExpositionValues<T>)
}
