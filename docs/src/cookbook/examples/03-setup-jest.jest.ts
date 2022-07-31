import { Exposition } from '@exposition/core'

const exposition = new Exposition({
  ride: {
    options: ['Bicycle 🚴', 'Car 🏎️'],
  },
})

afterEach(() => {
  exposition.reset()
})

it('should check if the given exposition can be', () => {
  expect(exposition.values).toMatchObject({
    ride: 'Bicycle 🚴',
  })
})
