import { expect, it } from 'vitest'
import { createExposition } from './createExposition'
import { getExpositionValues } from './getExpositionValues'
import { updateExpositionValues } from './updateExpositionValues'

it('should patch the given object', () => {
  const exposition = createExposition({
    autobot: { options: ['Optimus Prime', 'Bumblebee'] },
    decepticon: { options: ['Megatron', 'Starscream'] },
  } as const)

  const updatedExposition = updateExpositionValues(exposition, { autobot: 'Bumblebee', decepticon: 'Starscream' })

  expect(getExpositionValues(updatedExposition)).toMatchObject({
    autobot: 'Bumblebee',
    decepticon: 'Starscream',
  })
})

it('should return a immuteable object', () => {
  const exposition = createExposition({
    autobot: { options: ['Optimus Prime', 'Bumblebee'] },
    decepticon: { options: ['Megatron', 'Starscream'] },
  } as const)

  const updatedExposition = updateExpositionValues(exposition, { decepticon: 'Starscream' })

  exposition.decepticon.value = 'Megatron'

  expect(updatedExposition.decepticon.value).toBe('Starscream')
})
