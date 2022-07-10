import { createExposition } from '@exposition/core'
import { defineMSWIntegration } from '@exposition/integrations/msw'
import { rest, setupWorker } from 'msw'

// ----------------------------------------------

// #region create-exposition
export const exposition = createExposition({
  cart: {
    options: ['filled', 'empty'],
  },
} as const)
// #endregion create-exposition

// ----------------------------------------------

// #region setup-msw
// Setup Mock Service Worker
export const mockWorker = setupWorker()
// #endregion setup-msw

// ----------------------------------------------

// #region setup-msw-integration
// Setup the msw integration
export const mswIntegration = defineMSWIntegration({
  exposition,
  msw: mockWorker,
})
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

// #region start-integration
mswIntegration.init()
mockWorker.start()
// #endregion start-integration
