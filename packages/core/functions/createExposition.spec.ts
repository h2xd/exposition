import { expect, it } from 'vitest'
import { createExposition } from './createExposition'

it('should create an exposition with all required values', () => {
  const expositionConfig = {
    user: {
      options: [
        'well-behaved',
        'User was send to the shadow realm',
      ],
    },
  } as const

  const resultExposition = createExposition(expositionConfig)

  const expectedExposition = {
    user: {
      id: 'user',
      initialValue: 'well-behaved',
      value: 'well-behaved',
      options: ['well-behaved', 'User was send to the shadow realm'],
    },
  }

  expect(resultExposition).toMatchObject(expectedExposition)
})

it('should return a immutable exposition', () => {
  const expositionConfig = {
    user: {
      options: [
        'well-behaved',
        'User was send to the shadow realm',
      ],
    },
  }

  const resultExposition = createExposition(expositionConfig)

  // @ts-expect-error - mutate the initial configuration to check if all references are removed
  expositionConfig['new value'] = {}
  expositionConfig.user.options = []

  const expectedExposition = {
    user: {
      id: 'user',
      initialValue: 'well-behaved',
      value: 'well-behaved',
      options: ['well-behaved', 'User was send to the shadow realm'],
    },
  }

  expect(resultExposition).toMatchObject(expectedExposition)
})
