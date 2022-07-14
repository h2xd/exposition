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
            return response(context.json({ name: 'Spanky 🐕' }))
          case 'unauthorized':
            return response(context.status(401))
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
  integration.updateValues({ user: 'unauthorized' })

  const response = await fetch('https://api.example.com/account')

  expect(response.status).toBe(401)
})

it('should use no handler if explicitly called', async () => {
  await integration.useNoHandlers()

  try {
    await fetch('/')
  }
  catch (error) {
    expect(error).toBeDefined()
  }
})
