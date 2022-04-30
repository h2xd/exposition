import type { Exposition, ExpositionValues } from '../@types/exposition'

/**
 * Update the values of the given `Expostion`
 * @param exposition will be used as the base for the returned `Exposition`
 * @param config map that will be used to update the given `Exposition` values
 * @returns new `Exposition`
 */
export function updateExpositionValues<TExposition extends Exposition, TConfig extends ExpositionValues<TExposition>>(exposition: TExposition, config: Partial<TConfig>): TExposition {
  return Object.keys(exposition).reduce((accumulator, key) => {
    return {
      ...accumulator,
      [key]: {
        ...exposition[key],
        value: config[key] || exposition[key].value,
      },
    }
  }, {} as TExposition)
}
