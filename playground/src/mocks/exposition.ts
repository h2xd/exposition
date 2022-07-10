import { createExposition } from '@exposition/core'

export const playgroundExposition = createExposition({
  cart: {
    options: ['filled', 'empty'],
  },
  user: {
    options: ['registered', 'invalid-email'],
  },
} as const)
