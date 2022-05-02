import type { Exposition, ExpositionValues } from '../@types/exposition'

/**
 * Extract the current values from a given `Exposition` 📃
 *
 * @param exposition
 * @returns ExpositionValues
 * @example
  const exposition = createExposition({
    base: {
      options: [
        '🍚 rice',
        '🍝 Pasta - Mama Mia',
      ],
    },
  })

  getExpositionValues(exposition)) // { base: "🍚 rice" }
 */
export function getExpositionValues<T extends Exposition<any>>(exposition: T): ExpositionValues<T> {
  return Object.keys(exposition).reduce((accumulator, key) => {
    const scenario = exposition[key]

    return {
      ...accumulator,
      [key]: scenario.value,
    }
  }, {} as ExpositionValues<T>)
}
