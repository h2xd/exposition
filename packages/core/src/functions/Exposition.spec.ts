import { beforeEach, describe, expect, it, vi } from 'vitest'
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

  describe('methods', () => {
    it('should have a method to get the current values', () => {
      expect(exposition.values).toMatchObject({ dream: 'NREM_stage_1', reality: 'heatwave' })
    })

    it('should have a method to update the current values', () => {
      exposition.update({ dream: 'NREM_stage_2' })

      expect(exposition.values).toMatchObject({ dream: 'NREM_stage_2', reality: 'heatwave' })
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
    it('should emit an afterReset event', () => {
      const spy = vi.fn()

      exposition.on('afterReset', spy)
      exposition.reset()

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith({ dream: 'NREM_stage_1', reality: 'heatwave' })
    })

    it('should emit an afterUpdate event', () => {
      const spy = vi.fn()

      exposition.on('afterUpdate', spy)
      exposition.update({ dream: 'NREM_stage_3' })

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith({ dream: 'NREM_stage_3', reality: 'heatwave' })
    })

    it('should fire the initialized event', () => {
      const spy = vi.fn()

      exposition.on('initialized', spy)

      exposition.init()
      exposition.init()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe('integrations', () => {
    it('it should be able to use integrations', () => {
      const spy = vi.fn()

      exposition.use((context, settings) => {
        context.on('initialized', spy)
        expect(settings).toMatchObject({ settingsMastery: 1 })
      }, { settingsMastery: 1 })

      exposition.init()
      expect(spy).toHaveBeenCalled()
    })
  })
})
