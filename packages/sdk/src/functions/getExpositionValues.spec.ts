import { expect, it } from 'vitest'
import { createExpositionState } from './createExpositionState'
import { getExpositionValues } from './getExpositionValues'

it('should extract selected values from an Exposition', () => {
  const expositionConfig = {
    base: {
      options: [
        '🍚 rice',
        '🍝 Pasta - Mama Mia',
      ],
    },
    group1: {
      item1: {
        options: ['1', '2'],
      },
    },
  } as const

  const expositionState = createExpositionState(expositionConfig)
  const expositionValues = getExpositionValues(expositionState)

  expect(expositionValues).toMatchObject({
    base: '🍚 rice',
    group1: {
      item1: '1',
    },
  })
})

it('should return a map that wont mutate the given argument', () => {
  const expositionConfig = {
    base: {
      options: [
        '🍚 rice',
        '🍝 Pasta - Mama Mia',
      ],
    },
  } as const

  const expositionState = createExpositionState(expositionConfig)
  const expositionValues = getExpositionValues(expositionState)

  expositionState.base.value = '🍝 Pasta - Mama Mia'

  expect(expositionValues.base).toBe('🍚 rice')
})
