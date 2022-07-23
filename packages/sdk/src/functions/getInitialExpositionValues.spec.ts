import { expect, it } from 'vitest'
import { createExpositionState } from './createExpositionState'
import { getInitialExpositionValues } from './getInitialExpositionValues'
import { updateExpositionValues } from './updateExpositionValues'

it('should extract the initial values from an Exposition', () => {
  const expositionConfig = {
    progress: {
      options: [
        '🐛 Small',
        '🦋 Big',
      ],
    },
  } as const

  const expositionState = createExpositionState(expositionConfig)
  const updatedExpositionState = updateExpositionValues(expositionState, { progress: '🦋 Big' })
  const expositionValues = getInitialExpositionValues(updatedExpositionState)

  expect(expositionValues.progress).toBe('🐛 Small')
})

it('should return a map that wont mutate the given argument', () => {
  const expositionConfig = {
    progress: {
      options: [
        '🐛 Small',
        '🦋 Big',
      ],
    },
  } as const

  const expositionState = createExpositionState(expositionConfig)
  const expositionValues = getInitialExpositionValues(expositionState)

  expositionState.progress.value = '🦋 Big'

  expect(expositionValues.progress).toBe('🐛 Small')
})
