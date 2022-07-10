import { createExposition } from '@exposition/core'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { beforeEach } from 'vitest'
import fetch from 'node-fetch'
import { defineMSWIntegration } from './defineMSWIntegration'

const exposition = createExposition({
  user: {
    options: ['authorized', 'unauthorized'],
  },
} as const)

const server = setupServer()
const integration = defineMSWIntegration({
  exposition,
  msw: server,
})

beforeAll(() => {
  integration.createHandler((values) => {
    return [
      rest.get('https://api.example.com/account', (_request, response, context) => {
        switch (values.user) {
          case 'authorized':
            context.status(200)
            return response(context.json({ name: 'Spanky 🐕' }))
          case 'unauthorized':
            context.status(401)
            return response(context.json({}))
        }
      }),
    ]
  })

  server.listen()
})

beforeEach(integration.resetValues)

it('should return an authorized code by default', async () => {
  const response = await fetch('https://api.example.com/account')

  expect(response.status).toBe(200)
})

it('should return an 401 when set to unauthorized', async () => {
  integration.updateValues({ user: 'unauthorized' }).then(async () => {
    const response = await fetch('https://api.example.com/account')

    expect(response.status).toBe(401)
  })
})
