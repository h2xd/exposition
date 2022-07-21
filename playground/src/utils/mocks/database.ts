import { factory, primaryKey } from '@mswjs/data'
import { faker } from '@faker-js/faker'

export const mockDatabase = factory({
  items: {
    id: primaryKey(faker.datatype.uuid),
    name: () => faker.commerce.productName(),
    quantity: () => faker.datatype.number({ min: 1, max: 20, precision: 2 }),
  },
})

export function seedDatabase() {
  Array.from(Array(5)).forEach(() => {
    mockDatabase.items.create()
  })
}
