import EventEmitter from 'events'
import type { ExpositionEventNames } from '../config/eventNames'
import { EventNames } from '../config/eventNames'
import type { ExpositionConfig, ExpositionState, ExpositionValues } from '../sdk'
import { createExpositionState, getExpositionValues, getInitialExpositionValues, resetExpositionValues, updateExpositionValues } from '../sdk'

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

  public get initialValues(): ExpositionValues<ExpositionState<T>> {
    return getInitialExpositionValues(this.state)
  }

  public reset(scenariosToReset: (keyof ExpositionState<T>)[] = []): Exposition<T> {
    Object.assign(this.state, resetExpositionValues(this.state, scenariosToReset))
    this.emitter.emit(EventNames.RESET, this.values)

    return this
  }

  public update(newValues: Partial<ExpositionValues<ExpositionState<T>>>): Exposition<T> {
    Object.assign(this.state, updateExpositionValues(this.state, newValues))
    this.emitter.emit(EventNames.UPDATE, this.values)

    return this
  }

  public on(event: ExpositionEventNames, handler: (values: ExpositionValues<ExpositionState<T>>) => void): Exposition<T> {
    this.emitter.on(event, handler)

    return this
  }

  public use<Tfn extends (context: Exposition<T>, settings: TSettings) => TfnR, TSettings = Parameters<Tfn>[1], TfnR = ReturnType<Tfn>>(integrationFunction: Tfn, settings: Parameters<Tfn>[1]): TfnR {
    return integrationFunction(this, settings)
  }

  public init(): Exposition<T> {
    if (!this.initialized) {
      this.emitter.emit(EventNames.INITIALIZED)
      this.initialized = true
    }

    return this
  }
}

