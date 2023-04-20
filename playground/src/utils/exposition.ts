import { Exposition } from '@exposition/core'
import { createMswIntegration } from '@exposition/integrations/msw'
import { rest, setupWorker } from 'msw'
import { mockDatabase, seedDatabase } from './mocks/database'

export const playgroundExposition = new Exposition({
  cart: {
    options: ['filled', 'empty'],
  },
  user: {
    options: ['registered', 'invalid-email'],
  },
  group: {
    item1: {
      options: ['one', 'two'],
    },
    item2: {
      options: ['Dio 🌎', 'JoJo ⭐️'],
    },
  },
} as const)

playgroundExposition.use(seedDatabase, undefined)

const mswExposition = playgroundExposition.use(createMswIntegration<typeof playgroundExposition>, { msw: setupWorker() })

mswExposition.createHandler((values) => {
  return [
    rest.get('/cart', (_request, response, context) => {
      switch (values.cart) {
        case 'filled':
          return response(context.json(mockDatabase.items.getAll()))
        default:
          return response(context.json({}))
      }
    }),
  ]
})
