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
    duration: {
      length: {
        options: ['1 year', '2 years'],
      },
    },
  } as const

  const expositionState = createExpositionState(expositionConfig)
  const updatedExpositionState = updateExpositionValues(expositionState, { progress: '🦋 Big', duration: { length: '2 years' } })
  const expositionValues = getInitialExpositionValues(updatedExpositionState)

  expect(expositionValues).toMatchObject({
    progress: '🐛 Small',
    duration: {
      length: '1 year',
    },
  })
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
