import { expect, it } from 'vitest'
import type { Scenario } from '../@types/scenario'
import { getExpositionValues } from './getExpositionValues'

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

it('should extract selected values from an Exposition', () => {
  const exposition = {
    base: createTestScenario(),
  }

  const expositionValues = getExpositionValues(exposition)

  expect(expositionValues.base).toBe('pasta')
})

it('should return a map that wont mutate the given argument', () => {
  const exposition = {
    base: createTestScenario(),
  }

  const expositionValues = getExpositionValues(exposition)

  expositionValues.base = 'rice'

  expect(expositionValues.base).toBe('rice')
  expect(exposition.base.value).toBe('pasta')
})
