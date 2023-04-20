import type { PartialDeep } from 'type-fest'
import type { ExpositionState, ExpositionValues } from '../@types/exposition'
import { isScenario } from '../utils/guards'

/**
 * Update the values of the given `Exposition`. 🆕
 *
 * @param expositionState
 * @param values - that will be used to update the given `Exposition` values
 * @returns `Exposition`
 *
 * @example
  const expositionState = createExpositionState({
    autobot: { options: ['Optimus Prime 🚚', 'Bumblebee 🚗'] },
    decepticon: { options: ['Megatron ✈️', 'Starscream 🛩️'] },
  } as const)

  const updatedExposition = updateExpositionValues(expositionState, { autobot: 'Bumblebee 🚗' })

  getExpositionValues(updatedExposition) // { autobot: 'Bumblebee 🚗', decepticon: 'Megatron ✈️' }
 */
export function updateExpositionValues<T extends ExpositionState<any>, TValues extends PartialDeep<ExpositionValues<T>>>(expositionState: T, values: TValues): T {
  return Object.keys(expositionState).reduce((accumulator, key) => {
    const state = expositionState[key]
    // @ts-expect-error - TODO: figure out what is going on here
    const value = values[key]

    if (isScenario(state)) {
      return {
        ...accumulator,
        [key]: {
          ...expositionState[key],
          value: value || state.value,
        },
      }
    }

    return {
      ...accumulator,
      [key]: !value ? state : updateExpositionValues(state, value),
    }
  }, {} as T)
}
