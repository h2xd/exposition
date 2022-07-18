import { createExpositionState } from '@exposition/core'

export const playgroundExposition = createExpositionState({
  cart: {
    options: ['filled', 'empty'],
  },
  user: {
    options: ['registered', 'invalid-email'],
  },
} as const)
