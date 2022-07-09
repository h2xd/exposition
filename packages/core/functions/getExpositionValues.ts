import type { Exposition, ExpositionValues } from '../@types/exposition'

/**
 * Extract the current values from a given `Exposition`. 📃
 *
 * @param exposition
 * @returns ExpositionValues
 * @example
  const exposition = createExposition({
    base: {
      options: [
        '🍚 Rice - Cool',
        '🍝 Pasta - Mama Mia',
      ],
    },
  })

  getExpositionValues(exposition) // { base: "🍚 Rice - Cool" }
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
