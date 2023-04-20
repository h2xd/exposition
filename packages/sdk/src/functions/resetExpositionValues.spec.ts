import { expect, it } from 'vitest'
import { createExpositionState } from './createExpositionState'
import { getExpositionValues } from './getExpositionValues'
import { resetExpositionValues } from './resetExpositionValues'
import { updateExpositionValues } from './updateExpositionValues'

it('should reset the whole exposition', () => {
  const exposition = createExpositionState({
    user: { options: ['Dio', 'JoJo'] },
    stand: { options: ['The Worldo', 'Star Platinum'] },
    range: {
      all: {
        options: ['min', 'max'],
      },
      season: {
        options: ['1', '2', '3', '4', '5'],
      },
    },
  } as const)

  const updatedExposition = updateExpositionValues(exposition, { user: 'JoJo', stand: 'Star Platinum', range: { all: 'max', season: '2' } })

  expect(getExpositionValues(updatedExposition)).toMatchObject({
    user: 'JoJo',
    stand: 'Star Platinum',
    range: {
      all: 'max',
      season: '2',
    },
  })

  const resettedExposition = resetExpositionValues(updatedExposition)

  expect(getExpositionValues(resettedExposition)).toMatchObject({
    user: 'Dio',
    stand: 'The Worldo',
    range: {
      all: 'min',
      season: '1',
    },
  })
})

it('should return a immuteable object', () => {
  const exposition = createExpositionState({
    user: { options: ['Dio', 'JoJo'] },
    stand: { options: ['The Worldo', 'Star Platinum'] },
  } as const)

  const resettedExposition = resetExpositionValues(exposition)

  exposition.user.value = 'JoJo'

  expect(resettedExposition.user.value).toBe('Dio')
})

