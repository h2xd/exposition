import EventEmitter from 'events'
import type { ExpositionConfig, ExpositionValues } from '../@types/exposition'
import { createExpositionState, getExpositionValues, resetExpositionValues, updateExpositionValues } from '../utils'

const EventNames = {
  AFTER_UPDATE: 'afterUpdate',
} as const

export type ExpositionEventNames = typeof EventNames[keyof typeof EventNames]

export function createExposition<T extends ExpositionConfig>(config: T) {
  const emitter = new EventEmitter()
  const state = createExpositionState(config)

  function values() {
    return getExpositionValues(state)
  }

  function reset(scenariosToReset: (keyof typeof state)[] = []) {
    Object.assign(state, resetExpositionValues(state, scenariosToReset))
  }

  function update(newValues: Partial<ExpositionValues<typeof state>>) {
    Object.assign(state, updateExpositionValues(state, newValues))

    emitter.emit(EventNames.AFTER_UPDATE, values())
  }

  function on(event: ExpositionEventNames, handler: (values: ExpositionValues<typeof state>) => void) {
    emitter.on(event, handler)
  }

  return {
    values,
    reset,
    update,
    on,
  }
}

export type Exposition = ReturnType<typeof createExposition>
