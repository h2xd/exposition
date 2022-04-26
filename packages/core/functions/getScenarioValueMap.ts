import type { ScenarioMap, ScenarioValueMap } from '../@types/scenario'

/**
 * Extract the current values from a given `ScenarioMap`
 * @param scenarioMap
 * @returns ScenarioValueMap
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

  const TestScenarioMap = {
    base: CarbScenario,
  }

  const scenarioValues = getScenarioValueMap(TestScenarioMap)

  console.log(scenarioValues) // { base: "pasta" }
 */
export function getScenarioValueMap<T extends ScenarioMap>(scenarioMap: T): ScenarioValueMap<T> {
  return Object.keys(scenarioMap).reduce((accumulator, key) => {
    const scenario = scenarioMap[key]

    return {
      ...accumulator,
      [key]: scenario.value,
    }
  }, {} as ScenarioValueMap<T>)
}
