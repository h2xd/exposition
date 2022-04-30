import { expect, it } from 'vitest'
import { createExpositionFast } from './createExpositionFast'
import { resetExpositionValues } from './resetExpositionValues'
import { updateExpositionValues } from './updateExpositionValues'

it('should reset the whole exposition', () => {
  const exposition = createExpositionFast({
    user: ['Dio', 'JoJo'],
    stand: ['The Worldo', 'Star Platinum'],
  })

  const newExposition = updateExpositionValues(exposition, { user: 'JoJo', stand: 'Star Platinum' })

  expect(newExposition.user.value).toBe('JoJo')
  expect(newExposition.stand.value).toBe('Star Platinum')

  const resettedExposition = resetExpositionValues(newExposition)

  expect(resettedExposition.user.value).toBe('Dio')
  expect(resettedExposition.stand.value).toBe('The Worldo')
})

it('should return a immuteable object', () => {
  const exposition = createExpositionFast({
    time: ['running', 'frozen', 'reverse'],
  })

  const patchedExposition = updateExpositionValues(exposition, { time: 'frozen' })
  const resettedExposition = resetExpositionValues(patchedExposition)

  expect(exposition.time.value).toBe('running')
  expect(patchedExposition.time.value).toBe('frozen')
  expect(resettedExposition.time.value).toBe('running')
})

it('should only reset the given fields', () => {
  const exposition = createExpositionFast({
    autobot: ['Optimus Prime', 'Bumblebee'],
    decepticon: ['Megatron', 'Starscream'],
  })

  const patchedExposition = updateExpositionValues(exposition, {
    autobot: 'Bumblebee',
    decepticon: 'Starscream',
  })

  const resettedExposition = resetExpositionValues(patchedExposition, ['decepticon'])

  expect(resettedExposition.autobot.value).toBe('Bumblebee')
  expect(resettedExposition.decepticon.value).toBe('Megatron')
})
