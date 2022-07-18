import EventEmitter from 'events'
import type { ExpositionContext, ExpositionEventNames, ExpositionIntegration } from '../@types/exposition'
import { EventNames } from '../config/eventNames'
import type { ExpositionConfig, ExpositionValues } from '../sdk'
import { createExpositionState, getExpositionValues, resetExpositionValues, updateExpositionValues } from '../sdk'

export function createExposition<T extends ExpositionConfig>(config: T) {
  const emitter = new EventEmitter()
  const state = createExpositionState(config)
  let initialized = false

  function values(): ReturnType<ExpositionContext<typeof state>['values']> {
    return getExpositionValues(state)
  }

  function reset(scenariosToReset: Parameters<ExpositionContext<typeof state>['reset']>[0] = []): void {
    Object.assign(state, resetExpositionValues(state, scenariosToReset))
  }

  function update(newValues: Parameters<ExpositionContext<typeof state>['update']>[0]): void {
    Object.assign(state, updateExpositionValues(state, newValues))

    emitter.emit(EventNames.AFTER_UPDATE, values())
  }

  function on(event: ExpositionEventNames, handler: (values: ExpositionValues<typeof state>) => void): void {
    emitter.on(event, handler)
  }

  const context: ExpositionContext<typeof state> = {
    values,
    reset,
    update,
    on,
  }

  function use<TSettings, TIntegration extends ExpositionIntegration<TSettings>>(integration: TIntegration, settings: TSettings) {
    integration.install(context, settings)
  }

  function init() {
    if (!initialized) {
      emitter.emit(EventNames.INITIALIZED)
      initialized = true
    }
  }

  return {
    ...context,
    use,
    init,
  }
}

