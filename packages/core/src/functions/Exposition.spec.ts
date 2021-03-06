import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ExpositionSettings } from '../@types/Exposition.types'
import { Exposition } from './Exposition'

describe('Exposition', () => {
  const expositionConfig = {
    dream: {
      options: [
        'NREM_stage_1',
        'NREM_stage_2',
        'NREM_stage_3',
        'REM',
      ],
    },
    reality: {
      options: [
        'heatwave',
        'flooding',
        'thunderstorm',
      ],
    },
  } as const

  let exposition: Exposition<typeof expositionConfig>

  beforeEach(() => {
    exposition = new Exposition(expositionConfig)
  })

  const defaultSettings: ExpositionSettings = {
    active: true,
    restoreState: true,
  }

  describe('methods', () => {
    it('should have a method to get the current values', () => {
      expect(exposition.values).toMatchObject({ dream: 'NREM_stage_1', reality: 'heatwave' })
    })

    it('should have a method to update the current values', () => {
      exposition.update({ dream: 'NREM_stage_2' })

      expect(exposition.values).toMatchObject({ dream: 'NREM_stage_2', reality: 'heatwave' })
    })

    it('should have a method to get the initial values', () => {
      exposition.update({ dream: 'NREM_stage_2' })
      expect(exposition.initialValues).toMatchObject({ dream: 'NREM_stage_1', reality: 'heatwave' })
    })

    it('should have a method to reset the current values', () => {
      exposition.update({ dream: 'NREM_stage_2' })

      expect(exposition.values).toMatchObject({ dream: 'NREM_stage_2', reality: 'heatwave' })

      exposition.reset()
      expect(exposition.values).toMatchObject({ dream: 'NREM_stage_1', reality: 'heatwave' })
    })

    it('should only reset a subset of scenarios', () => {
      exposition.update({ dream: 'NREM_stage_2', reality: 'thunderstorm' })

      expect(exposition.values).toMatchObject({ dream: 'NREM_stage_2', reality: 'thunderstorm' })

      exposition.reset(['reality'])
      expect(exposition.values).toMatchObject({ dream: 'NREM_stage_2', reality: 'heatwave' })
    })
  })

  describe('events', () => {
    it('should emit an reset event', () => {
      const spy = vi.fn()

      exposition.on('reset', spy)
      exposition.reset()

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith({ dream: 'NREM_stage_1', reality: 'heatwave' }, defaultSettings)
    })

    it('should emit an update event', () => {
      const spy = vi.fn()

      exposition.on('update', spy)
      exposition.update({ dream: 'NREM_stage_3' })

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith({ dream: 'NREM_stage_3', reality: 'heatwave' }, defaultSettings)
    })

    it('should fire the initialized event', () => {
      const spy = vi.fn()

      exposition.on('initialized', spy)

      exposition.init()
      exposition.init()
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith({ dream: 'NREM_stage_1', reality: 'heatwave' }, defaultSettings)
    })
  })

  describe('integrations', () => {
    it('it should be able to use integrations', () => {
      const spy = vi.fn()

      function integration(context: typeof exposition, settings: { settingsMastery: number }) {
        context.on('initialized', spy)
        expect(settings).toMatchObject({ settingsMastery: 1 })
      }

      exposition.use(integration, { settingsMastery: 1 })

      exposition.init()
      expect(spy).toHaveBeenCalled()
      expect(spy).toHaveBeenCalledWith({ dream: 'NREM_stage_1', reality: 'heatwave' }, defaultSettings)
    })
  })

  describe('settings', () => {
    describe('getters', () => {
      it('should have a getter for settings', () => {
        expect(exposition.settings).toMatchObject(Object.freeze({ active: true, restoreState: true }))
      })

      it('should provide an option to override the default settings', () => {
        const otherInitialSettings = new Exposition({}, { settings: { active: false } })

        expect(otherInitialSettings.settings).toEqual({ active: false, restoreState: true })
      })
    })

    describe('methods', () => {
      it('should provide an option to update the current settings', () => {
        exposition.updateSettings({ active: false })

        expect(exposition.settings).toMatchObject({ active: false, restoreState: true })
      })
    })

    describe('events', () => {
      it('should emit an updateSettings event', () => {
        const spy = vi.fn()

        exposition.on('updateSettings', spy)
        exposition.updateSettings({ active: false })

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith({ dream: 'NREM_stage_1', reality: 'heatwave' }, { active: false, restoreState: true })
      })
    })
  })
})
