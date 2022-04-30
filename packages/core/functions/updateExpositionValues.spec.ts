import { expect, it } from 'vitest'
import { createExpositionFast } from './createExpositionFast'
import { updateExpositionValues } from './updateExpositionValues'

it('should patch the given object', () => {
  const exposition = createExpositionFast({
    user: ['Dio', 'JoJo'],
    stand: ['The Worldo', 'Star Platinum'],
  })

  const newExposition = updateExpositionValues(exposition, { user: 'JoJo', stand: 'Star Platinum' })

  expect(newExposition.user.value).toBe('JoJo')
  expect(newExposition.stand.value).toBe('Star Platinum')
})

it('should return a immuteable object', () => {
  const exposition1 = createExpositionFast({
    time: ['running', 'frozen', 'reverse'],
  })

  const patchedExposition1 = updateExpositionValues(exposition1, { time: 'frozen' })
  const patchedExposition2 = updateExpositionValues(patchedExposition1, { time: 'reverse' })

  expect(exposition1.time.value).toBe('running')
  expect(patchedExposition1.time.value).toBe('frozen')
  expect(patchedExposition2.time.value).toBe('reverse')
})
