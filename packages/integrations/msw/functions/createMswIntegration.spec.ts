import { Exposition } from '@exposition/core'
import { rest } from 'msw'
import type { SetupServerApi } from 'msw/node'
import { setupServer } from 'msw/node'
import { afterEach, describe } from 'vitest'
import fetch from 'node-fetch'
import { createMswIntegration } from './createMswIntegration'

function withLifeCycleHooks(exposition: Exposition<any>): SetupServerApi {
  const server = setupServer()

  afterEach(() => {
    exposition.reset()
    exposition.updateSettings({ active: true, restoreState: true })
  })

  afterAll(() => {
    server.close()
  })

  return server
}

describe('createMswIntegration', () => {
  describe('simple usage', () => {
    const exposition = new Exposition({
      user: {
        options: ['authorized', 'unauthorized'],
      },
    } as const)

    const server = withLifeCycleHooks(exposition)

    beforeAll(() => {
      const mswIntegration = createMswIntegration(exposition, { msw: server, config: {} })

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

  describe('advanced', () => {
    describe('with config option', () => {
      const advancedExposition = new Exposition({
        dog: {
          options: ['happy', 'veryHappy'],
        },
      } as const)

      const server = withLifeCycleHooks(advancedExposition)

      beforeAll(() => {
        const mswIntegrationAdvanced = createMswIntegration(advancedExposition, { msw: server, config: { baseUrl: 'https://api.example.com' } })

        mswIntegrationAdvanced.createHandler((values, config) => {
          return [
            rest.get(`${config.baseUrl}/dog`, (_request, response, context) => {
              switch (values.dog) {
                case 'happy':
                  return response(context.json({ name: 'Spanky 🐕', sound: 'Happy' }))
                case 'veryHappy':
                  return response(context.json({ name: 'Spanky 🐕', sound: 'VeryHappy' }))
              }
            }),
          ]
        })

        advancedExposition.init()
      })

      it('should create a handler with the base config', async () => {
        const response = await fetch('https://api.example.com/dog')
        const responseJson = await response.json()

        expect(responseJson).toMatchObject({ name: 'Spanky 🐕', sound: 'Happy' })

        advancedExposition.update({ dog: 'veryHappy' })

        const responseSecond = await fetch('https://api.example.com/dog')
        const responseJsonSecond = await responseSecond.json()

        expect(responseJsonSecond).toMatchObject({ name: 'Spanky 🐕', sound: 'VeryHappy' })
      })
    })

    describe('with msw injection', () => {
      const advancedExposition = new Exposition({
        cat: {
          options: ['happy', 'veryHappy'],
        },
      } as const)

      const server = withLifeCycleHooks(advancedExposition)

      beforeAll(() => {
        const mswIntegrationAdvanced = createMswIntegration(advancedExposition)

        mswIntegrationAdvanced.createHandler((values) => {
          return [
            rest.get('https://api.example.com/cat', (_request, response, context) => {
              switch (values.cat) {
                case 'happy':
                  return response(context.json({ name: 'Quentin 🐈', sound: 'Happy' }))
                case 'veryHappy':
                  return response(context.json({ name: 'Quentin 🐈', sound: 'VeryHappy' }))
              }
            }),
          ]
        })

        mswIntegrationAdvanced.injectMsw(server)
        advancedExposition.init()
      })

      it('should create a handler with an injected msw instance', async () => {
        const response = await fetch('https://api.example.com/cat')
        const responseJson = await response.json()

        expect(responseJson).toMatchObject({ name: 'Quentin 🐈', sound: 'Happy' })

        advancedExposition.update({ cat: 'veryHappy' })

        const responseSecond = await fetch('https://api.example.com/cat')
        const responseJsonSecond = await responseSecond.json()

        expect(responseJsonSecond).toMatchObject({ name: 'Quentin 🐈', sound: 'VeryHappy' })
      })
    })
  })
})

