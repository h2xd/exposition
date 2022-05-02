import { expect, it } from 'vitest'
import { createExposition } from './createExposition'
import { getExpositionValues } from './getExpositionValues'
import { resetExpositionValues } from './resetExpositionValues'
import { updateExpositionValues } from './updateExpositionValues'

it('should reset the whole exposition', () => {
  const exposition = createExposition({
    user: { options: ['Dio', 'JoJo'] },
    stand: { options: ['The Worldo', 'Star Platinum'] },
  } as const)

  const updatedExposition = updateExpositionValues(exposition, { user: 'JoJo', stand: 'Star Platinum' })

  expect(getExpositionValues(updatedExposition)).toMatchObject({
    user: 'JoJo',
    stand: 'Star Platinum',
  })

  const resettedExposition = resetExpositionValues(updatedExposition)

  expect(getExpositionValues(resettedExposition)).toMatchObject({
    user: 'Dio',
    stand: 'The Worldo',
  })
})

it('should return a immuteable object', () => {
  const exposition = createExposition({
    user: { options: ['Dio', 'JoJo'] },
    stand: { options: ['The Worldo', 'Star Platinum'] },
  } as const)

  const resettedExposition = resetExpositionValues(exposition)

  exposition.user.value = 'JoJo'

  expect(resettedExposition.user.value).toBe('Dio')
})

it('should only reset the given fields', () => {
  const exposition = createExposition({
    user: { options: ['Dio', 'JoJo'] },
    stand: { options: ['The Worldo', 'Star Platinum'] },
  } as const)

  const patchedExposition = updateExpositionValues(exposition, {
    user: 'JoJo',
    stand: 'Star Platinum',
  })

  const resettedExposition = resetExpositionValues(patchedExposition, ['stand'])

  expect(getExpositionValues(resettedExposition)).toMatchObject({
    user: 'JoJo',
    stand: 'The Worldo',
  })
})
