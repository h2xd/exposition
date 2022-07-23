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
  } as const

  const expositionState = createExpositionState(expositionConfig)
  const expositionValues = getExpositionValues(expositionState)

  expect(expositionValues.base).toBe('🍚 rice')
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
