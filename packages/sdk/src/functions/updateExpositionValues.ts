import type { ExpositionState, ExpositionValues } from '../@types/exposition'

/**
 * Update the values of the given `Exposition`. đ
 *
 * @param expositionState
 * @param values - that will be used to update the given `Exposition` values
 * @returns `Exposition`
 *
 * @example
  const expositionState = createExpositionState({
    autobot: { options: ['Optimus Prime đ', 'Bumblebee đ'] },
    decepticon: { options: ['Megatron âī¸', 'Starscream đŠī¸'] },
  } as const)

  const updatedExposition = updateExpositionValues(expositionState, { autobot: 'Bumblebee đ' })

  getExpositionValues(updatedExposition) // { autobot: 'Bumblebee đ', decepticon: 'Megatron âī¸' }
 */
export function updateExpositionValues<T extends ExpositionState<any>, TValues extends ExpositionValues<T>>(expositionState: T, values: Partial<TValues>): T {
  return Object.keys(expositionState).reduce((accumulator, key) => {
    return {
      ...accumulator,
      [key]: {
        ...expositionState[key],
        value: values[key] || expositionState[key].value,
      },
    }
  }, {} as T)
}
