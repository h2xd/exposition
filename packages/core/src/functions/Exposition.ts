import EventEmitter from 'events'
import type { ExpositionEventNames } from '../config/eventNames'
import { EventNames } from '../config/eventNames'
import type { ExpositionConfig, ExpositionState, ExpositionValues } from '../sdk'
import { createExpositionState, getExpositionValues, resetExpositionValues, updateExpositionValues } from '../sdk'

export class Exposition<T extends ExpositionConfig> {
  private emitter = new EventEmitter()
  private state: ExpositionState<T>
  private initialized = false

  public constructor(config: T) {
    this.state = createExpositionState(config)
  }

  public get values(): ExpositionValues<ExpositionState<T>> {
    return getExpositionValues(this.state)
  }

  public reset(scenariosToReset: (keyof ExpositionState<T>)[] = []): Exposition<T> {
    Object.assign(this.state, resetExpositionValues(this.state, scenariosToReset))
    this.emitter.emit(EventNames.AFTER_RESET, this.values)

    return this
  }

  public update(newValues: Partial<ExpositionValues<ExpositionState<T>>>): Exposition<T> {
    Object.assign(this.state, updateExpositionValues(this.state, newValues))
    this.emitter.emit(EventNames.AFTER_UPDATE, this.values)

    return this
  }

  public on(event: ExpositionEventNames, handler: (values: ExpositionValues<ExpositionState<T>>) => void): Exposition<T> {
    this.emitter.on(event, handler)

    return this
  }

  public use<TSettings, TIntegration extends ExpositionIntegration<TSettings, Exposition<T>>>(integration: TIntegration, settings: TSettings): Exposition<T> {
    integration.install(this, settings)

    return this
  }

  public init(): Exposition<T> {
    if (!this.initialized) {
      this.emitter.emit(EventNames.INITIALIZED)
      this.initialized = true
    }

    return this
  }
}

export interface ExpositionIntegration<TSettings extends Record<string, any>, TExposition = Exposition<any>> {
  install(context: TExposition, settings: TSettings): void
}
