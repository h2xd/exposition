import { expect, it } from 'vitest'
import { createExpositionState } from './createExpositionState'
import { getInitialExpositionValues } from './getInitialExpositionValues'
import { updateExpositionValues } from './updateExpositionValues'

it('should extract the initial values from an Exposition', () => {
  const expositionConfig = {
    base: {
      options: [
        '🍚 rice',
        '🍝 Pasta - Mama Mia',
      ],
    },
  } as const

  const expositionState = createExpositionState(expositionConfig)
  const updatedExpositionState = updateExpositionValues(expositionState, { base: '🍝 Pasta - Mama Mia' })
  const expositionValues = getInitialExpositionValues(updatedExpositionState)

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
  const expositionValues = getInitialExpositionValues(expositionState)

  expositionState.base.value = '🍝 Pasta - Mama Mia'

  expect(expositionValues.base).toBe('🍚 rice')
})
