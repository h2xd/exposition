import { rest } from 'msw'
import { factory, primaryKey } from '@mswjs/data'
import { faker } from '@faker-js/faker'
import type { playgroundValues } from './exposition'

const database = factory({
  items: {
    id: primaryKey(faker.datatype.uuid),
    name: () => faker.commerce.productName(),
    quantity: () => faker.datatype.number({ min: 1, max: 20, precision: 2 }),
  },
})

export function seedDatabase() {
  Array.from(Array(5)).forEach(() => {
    database.items.create()
  })
}

function cart(expositionValues: playgroundValues) {
  return [
    rest.get('/cart', (request, response, context) => {
      switch (expositionValues.cart) {
        case 'filled':
          return response(context.json(database.items.getAll()))
        default:
          return response(context.json({}))
      }
    }),
  ]
}

export const handlerList = [
  cart,
]
