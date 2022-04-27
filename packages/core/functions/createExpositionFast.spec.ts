import { expect, it } from 'vitest'
import type { Scenario } from '../@types/scenario'
import { createExpositionFast } from './createExpositionFast'

it('should create an Exposition with all required values', () => {
  const resultExposition = createExpositionFast({
    stand: ['diamond', 'world'],
  })

  const expectedExposition = {
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

  expect(resultExposition).toMatchObject(expectedExposition)
})
