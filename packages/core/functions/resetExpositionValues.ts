import type { Exposition } from '../@types/exposition'

/**
 * Reset the `value` of `Scenarios` to their `initialValue`
 * @param exposition
 * @returns resetted `Exposition`
 */
export function resetExpositionValues<TExposition extends Exposition>(exposition: TExposition, scenariosToReset: (keyof TExposition)[] = []): TExposition {
  return Object.keys(exposition).reduce((accumulator, key) => {
    const shouldReset = scenariosToReset.length === 0 || scenariosToReset.includes(key)

    return {
      ...accumulator,
      [key]: {
        ...exposition[key],
        value: shouldReset ? exposition[key].initialValue : exposition[key].value,
      },
    }
  }, {} as TExposition)
}
