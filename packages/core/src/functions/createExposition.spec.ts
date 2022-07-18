import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createExposition } from './createExposition'

describe('createExposition', () => {
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

  let exposition: ReturnType<typeof createExposition<typeof expositionConfig>>

  beforeEach(() => {
    exposition = createExposition(expositionConfig)
  })

  describe('methods', () => {
    it('should have a method to get the current values', () => {
      expect(exposition.values()).toMatchObject({ dream: 'NREM_stage_1', reality: 'heatwave' })
    })

    it('should have a method to update the current values', () => {
      exposition.update({ dream: 'NREM_stage_2' })

      expect(exposition.values()).toMatchObject({ dream: 'NREM_stage_2', reality: 'heatwave' })
    })

    it('should have a method to reset the current values', () => {
      exposition.update({ dream: 'NREM_stage_2' })

      expect(exposition.values()).toMatchObject({ dream: 'NREM_stage_2', reality: 'heatwave' })

      exposition.reset()
      expect(exposition.values()).toMatchObject({ dream: 'NREM_stage_1', reality: 'heatwave' })
    })

    it('should only reset a subset of scenarios', () => {
      exposition.update({ dream: 'NREM_stage_2', reality: 'thunderstorm' })

      expect(exposition.values()).toMatchObject({ dream: 'NREM_stage_2', reality: 'thunderstorm' })

      exposition.reset(['reality'])
      expect(exposition.values()).toMatchObject({ dream: 'NREM_stage_2', reality: 'heatwave' })
    })
  })

  describe('events', () => {
    it('should emit an afterUpdate event', () => {
      const spy = vi.fn()

      exposition.on('afterUpdate', spy)
      exposition.update({ dream: 'NREM_stage_3' })

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith({ dream: 'NREM_stage_3', reality: 'heatwave' })
    })
  })
})
