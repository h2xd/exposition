import { expect, it } from 'vitest'
import { createExpositionState } from './createExpositionState'

it('should create an exposition with all required values', () => {
  const expositionConfig = {
    user: {
      options: [
        'well-behaved',
        'User was send to the shadow realm',
      ],
    },
  } as const

  const resultExposition = createExpositionState(expositionConfig)

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

  const resultExposition = createExpositionState(expositionConfig)

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

it('should create grouped states', () => {
  const expositionConfig = {
    user: {
      options: [
        'well-behaved',
        'User was send to the shadow realm',
      ],
    },
    group: {
      item1: {
        options: [
          'option1',
          'option2',
        ],
      },
      group2: {
        item2: {
          options: [
            'option2.1',
            'option2.2',
          ],
        },
      },
    },
  }

  const resultExposition = createExpositionState(expositionConfig)

  const expectedExposition = {
    user: {
      id: 'user',
      initialValue: 'well-behaved',
      value: 'well-behaved',
      options: ['well-behaved', 'User was send to the shadow realm'],
    },
    group: {
      item1: {
        id: 'group.item1',
        initialValue: 'option1',
        value: 'option1',
        options: ['option1', 'option2'],
      },
      group2: {
        item2: {
          id: 'group.group2.item2',
          initialValue: 'option2.1',
          value: 'option2.1',
          options: ['option2.1', 'option2.2'],
        },
      },
    },
  }

  expect(resultExposition).toMatchObject(expectedExposition)
})
