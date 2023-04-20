import type { ExpositionState } from '../@types/exposition'
import { isScenario } from '../utils/guards'

/**
 * Reset the values of a given `Exposition` to their initialValue. ⏰
 *
 * @param expositionState
 * @returns `ExpositionState`
 * @example
  const expositionState = createExpositionState({
    character: { options: ['Dio 🌎', 'JoJo 🌟'] },
  } as const)

  const updatedExposition = updateExpositionValues(
    expositionState,
    { character: 'JoJo 🌟' }
  )
  getExpositionValues(updatedExposition) // { character: "JoJo 🌟" }

  const revertedExposition = resetExpositionValues(updatedExposition)
  getExpositionValues(revertedExposition) // { character: "Dio 🌎" }
 */
export function resetExpositionValues<T extends ExpositionState<any>>(expositionState: T): T {
  return Object.keys(expositionState).reduce((accumulator, key) => {
    const state = expositionState[key]

    if (isScenario(state)) {
      return {
        ...accumulator,
        [key]: {
          ...state,
          value: state.initialValue,
        },
      }
    }

    return {
      ...accumulator,
      [key]: resetExpositionValues(state),
    }
  }, {} as T)
}
