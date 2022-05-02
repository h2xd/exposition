import { expect, it } from 'vitest'
import { createExposition } from './createExposition'
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

  const exposition = createExposition(expositionConfig)
  const expositionValues = getExpositionValues(exposition)

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

  const exposition = createExposition(expositionConfig)
  const expositionValues = getExpositionValues(exposition)

  exposition.base.value = '🍝 Pasta - Mama Mia'

  expect(expositionValues.base).toBe('🍚 rice')
})
