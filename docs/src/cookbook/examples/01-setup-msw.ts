// #region imports
import { Exposition } from '@exposition/core'
import { createMswIntegration } from '@exposition/integrations/msw'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
// #endregion imports

// ----------------------------------------------

// #region create-exposition
export const exampleExposition = new Exposition({
  cart: {
    options: ['filled', 'empty'],
  },
} as const)
// #endregion create-exposition

// ----------------------------------------------

// #region setup-msw-integration
export const mswIntegration = createMswIntegration(
  exampleExposition,
  {
    msw: setupServer(),
    config: {
      baseUrl: 'https://localhost:1337',
    },
  },
)
// #endregion setup-msw-integration

// ----------------------------------------------

// #region define-msw-handler
const cartItems = [
  // ... define mocks for cart items
]

mswIntegration.createHandler((expositionValues) => {
  return [
    rest.get('/cart', (_request, response, context) => {
      switch (expositionValues.cart) {
        case 'filled':
          return response(context.json({ items: cartItems }))
        default:
          return response(context.json({}))
      }
    }),
  ]
})
// #endregion define-msw-handler

// ----------------------------------------------

// #region init-exposition
exampleExposition.init()
// #endregion init-exposition

// #region define-msw-handler-with-config
mswIntegration.createHandler(
  (_expositionValues, config) => {
    return [
      rest.get(`${config.baseUrl}/cart`, () => {
        // ... your handler logic
      }),
    ]
  })
// #endregion define-msw-handler-with-config
