import { expect, it } from 'vitest'
import { createExpositionState } from './createExpositionState'
import { getExpositionValues } from './getExpositionValues'
import { updateExpositionValues } from './updateExpositionValues'

it('should patch the given object', () => {
  const expositionState = createExpositionState({
    autobot: { options: ['Optimus Prime', 'Bumblebee'] },
    decepticon: { options: ['Megatron', 'Starscream'] },
  } as const)

  const updatedExposition = updateExpositionValues(expositionState, { autobot: 'Bumblebee', decepticon: 'Starscream' })

  expect(getExpositionValues(updatedExposition)).toMatchObject({
    autobot: 'Bumblebee',
    decepticon: 'Starscream',
  })
})

it('should return a immuteable object', () => {
  const expositionState = createExpositionState({
    autobot: { options: ['Optimus Prime', 'Bumblebee'] },
    decepticon: { options: ['Megatron', 'Starscream'] },
  } as const)

  const updatedExposition = updateExpositionValues(expositionState, { decepticon: 'Starscream' })

  expositionState.decepticon.value = 'Megatron'

  expect(updatedExposition.decepticon.value).toBe('Starscream')
})
