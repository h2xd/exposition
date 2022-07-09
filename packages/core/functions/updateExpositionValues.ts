import type { Exposition, ExpositionValues } from '../@types/exposition'

/**
 * Update the values of the given `Exposition`. 🆕
 *
 * @param exposition
 * @param values - that will be used to update the given `Exposition` values
 * @returns `Exposition`
 *
 * @example
  const exposition = createExposition({
    autobot: { options: ['Optimus Prime 🚚', 'Bumblebee 🚗'] },
    decepticon: { options: ['Megatron ✈️', 'Starscream 🛩️'] },
  } as const)

  const updatedExposition = updateExpositionValues(exposition, { autobot: 'Bumblebee 🚗' })

  getExpositionValues(updatedExposition) // { autobot: 'Bumblebee 🚗', decepticon: 'Megatron ✈️' }
 */
export function updateExpositionValues<TExposition extends Exposition<any>, TValues extends ExpositionValues<TExposition>>(exposition: TExposition, values: Partial<TValues>): TExposition {
  return Object.keys(exposition).reduce((accumulator, key) => {
    return {
      ...accumulator,
      [key]: {
        ...exposition[key],
        value: values[key] || exposition[key].value,
      },
    }
  }, {} as TExposition)
}
