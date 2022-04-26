import { expect, it } from 'vitest'
import type { Scenario } from '../@types/scenario'
import { createFastScenarioConfig } from './createFastScenarioConfig'

it('should create basic scenario with all required values', () => {
  const result = createFastScenarioConfig({
    stand: ['diamond', 'world'],
  } as const)

  const expectedScenario = {
    stand: {
      name: 'stand',
      initialValue: 'diamond',
      value: 'diamond',
      options: [
        {
          value: 'diamond',
        },
        {
          value: 'world',
        },
      ],
    } as Scenario<'diamond' | 'world'>,
  }

  expect(result).toMatchObject(expectedScenario)
})
