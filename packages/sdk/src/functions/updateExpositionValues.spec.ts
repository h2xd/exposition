import { expect, it } from 'vitest'
import { createExpositionState } from './createExpositionState'
import { getExpositionValues } from './getExpositionValues'
import { updateExpositionValues } from './updateExpositionValues'

it('should patch the given object', () => {
  const expositionState = createExpositionState({
    autobot: { options: ['Optimus Prime', 'Bumblebee'] },
    decepticon: { options: ['Megatron', 'Starscream'] },
    group1: {
      item1: {
        options: ['1', '2', '3'],
      },
      item2: {
        options: ['1', '2', '3'],
      },
      group1_2: {
        item2_1: {
          options: ['1', '2', '3'],
        },
      },
    },
  } as const)

  const updatedExposition = updateExpositionValues(expositionState, { autobot: 'Bumblebee', decepticon: 'Starscream', group1: { item2: '2' } })

  expect(getExpositionValues(updatedExposition)).toMatchObject({
    autobot: 'Bumblebee',
    decepticon: 'Starscream',
    group1: {
      item1: '1',
      item2: '2',
      group1_2: {
        item2_1: '1',
      },
    },
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
