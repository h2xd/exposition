import { expect, it } from 'vitest'
import { createExposition } from './createExposition'

it('should create an exposition with all required values', () => {
  const resultExposition = createExposition({
    user: {
      description: 'User configuration',
      options: [{ value: 'well-behaved' }, { label: 'User was send to the shadow realm', value: 'banned' }],
    },
  })

  const expectedExposition = {
    user: {
      name: 'user',
      description: 'User configuration',
      initialValue: 'well-behaved',
      value: 'well-behaved',
      options: [
        {
          value: 'well-behaved',
        },
        { label: 'User was send to the shadow realm', value: 'banned' },
      ],
    },
  }

  expect(resultExposition).toMatchObject(expectedExposition)
})

it('should return a immutable exposition', () => {
  const options = {
    user: {
      description: 'User configuration',
      options: [{ value: 'well-behaved' }, { label: 'User was send to the shadow realm', value: 'banned' }],
    },
  }

  const resultExposition = createExposition(options)

  options.user.description = 'change options'
  options.user.options = []

  expect(resultExposition.user.description).toBe('User configuration')
  expect(resultExposition.user.options).toMatchObject([{ value: 'well-behaved' }, { label: 'User was send to the shadow realm', value: 'banned' }])
})
