import { Exposition } from '@exposition/core'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { afterEach, describe } from 'vitest'
import fetch from 'node-fetch'
import { createMswIntegration } from './createMswIntegration'

describe('createMswIntegration', () => {
  const exposition = new Exposition({
    user: {
      options: ['authorized', 'unauthorized'],
    },
  } as const)

  beforeAll(() => {
    const mswIntegration = exposition.use(createMswIntegration<typeof exposition>, { msw: setupServer() })

    mswIntegration.createHandler((values) => {
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

    exposition.init()
  })

  afterEach(() => {
    exposition.reset()
    exposition.updateSettings({ active: true, restoreState: true })
  })

  it('should return an authorized code by default', async () => {
    const response = await fetch('https://api.example.com/account')

    expect(response.status).toBe(200)
  })

  it('should return an 401 when set to unauthorized', async () => {
    exposition.update({ user: 'unauthorized' })

    const response = await fetch('https://api.example.com/account')

    expect(response.status).toBe(401)
  })

  describe('settings hooks', () => {
    it('should use no handler if exposition is set to inactive', async () => {
      exposition.updateSettings({ active: false })

      try {
        await fetch('/')
      }
      catch (error) {
        expect(error).toBeDefined()
      }
    })

    it('should reactivate handler when exposition.settings.active is updated to true', async () => {
      exposition.updateSettings({ active: false })

      try {
        await fetch('/')
      }
      catch (error) {
        expect(error).toBeDefined()
      }

      exposition.updateSettings({ active: true })

      const response = await fetch('https://api.example.com/account')

      expect(response.status).toBe(200)
    })
  })
})

