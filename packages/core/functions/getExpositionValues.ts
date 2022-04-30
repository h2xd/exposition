import type { ExpositionReturn, ExpositionValues } from '../@types/exposition'

/**
 * Extract the current values from a given `Exposition`
 * @param exposition
 * @returns ExpositionValues
 * @example
  const CarbScenario: Scenario<'rice' | 'pasta'> = {
    name: 'carb',
    description: 'Carbohydrate Scenario',
    initialValue: 'rice',
    value: 'pasta',
    options: [
      {
        label: 'Rice 🍚 is a good option',
        value: 'rice',
      },
      {
        label: 'Pasta 🍝 is also a good option',
        value: 'pasta',
      },
    ],
  }

  const exposition = {
    base: CarbScenario,
  }

  const expositionValues = getExpositionValues(exposition)

  console.log(expositionValues) // { base: "pasta" }
 */
export function getExpositionValues<T extends ExpositionReturn<any>>(exposition: T): ExpositionValues<T> {
  return Object.keys(exposition).reduce((accumulator, key) => {
    const scenario = exposition[key]

    return {
      ...accumulator,
      [key]: scenario.value,
    }
  }, {} as ExpositionValues<T>)
}
