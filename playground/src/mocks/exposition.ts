import { createExposition } from '../../../packages/core'

export const playgroundExposition = createExposition({
  cart: {
    options: ['filled', 'empty'],
  },
  user: {
    options: ['registered', 'invalid-email'],
  },
} as const)
