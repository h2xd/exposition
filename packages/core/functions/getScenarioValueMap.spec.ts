import { expect, it } from 'vitest'
import type { Scenario } from '../@types/scenario'
import { getScenarioValueMap } from './getScenarioValueMap'

function createTestScenario(): Scenario<'rice' | 'pasta'> {
  return {
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
}

it('should extract selected values from a ScenarioMap', () => {
  const TestScenarioMap = {
    base: createTestScenario(),
  }

  const result = getScenarioValueMap(TestScenarioMap)

  expect(result.base).toBe('pasta')
})

it('should return a map that wont mutate the given argument', () => {
  const TestScenarioMap = {
    base: createTestScenario(),
  }

  const result = getScenarioValueMap(TestScenarioMap)

  result.base = 'rice'

  expect(result.base).toBe('rice')
  expect(TestScenarioMap.base.value).toBe('pasta')
})
