import { rest, setupWorker } from 'msw'
import { defineMSWIntegration } from '../../../packages/msw'
import { playgroundExposition } from './exposition'
import { mockDatabase } from './mockDatabase'

export const mockWorker = setupWorker()

export const mswIntegration = defineMSWIntegration({
  exposition: playgroundExposition,
  msw: mockWorker,
})

mswIntegration.createHandler((values) => {
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
