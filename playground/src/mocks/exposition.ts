import { createExposition } from '../../../packages/web/node_modules/@exposition/core/dist'
import type { ExpositionValues } from '../../../packages/web/node_modules/@exposition/core/dist'

export const playgroundExposition = createExposition({
  cart: {
    options: ['filled', 'empty'],
  },
} as const)

export type playgroundValues = ExpositionValues<typeof playgroundExposition>
