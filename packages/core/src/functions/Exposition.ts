import EventEmitter from 'events'
import type { PartialDeep } from 'type-fest'
import type { ExpositionConfig, ExpositionState, ExpositionValues } from '@exposition/sdk'
import { createExpositionState, getExpositionValues, getInitialExpositionValues, resetExpositionValues, updateExpositionValues } from '@exposition/sdk'

import type { ExpositionContext, ExpositionSettings } from '../@types/Exposition.types'
import type { ExpositionEventNames } from '../config/eventNames'
import { EventNames } from '../config/eventNames'

export class Exposition<T extends ExpositionConfig> {
  private emitter = new EventEmitter()
  private state: ExpositionState<T>
  private settingsState: ExpositionSettings = {
    active: true,
    restoreState: true,
  }

  private initialized = false

  public constructor(config: T, options: PartialDeep<ExpositionContext> = {}) {
    this.state = createExpositionState(config)

    this.assignNewSettings(options?.settings || {})
  }

  public get values(): ExpositionValues<ExpositionState<T>> {
    return getExpositionValues(this.state)
  }

  public get initialValues(): ExpositionValues<ExpositionState<T>> {
    return getInitialExpositionValues(this.state)
  }

  public get settings(): Readonly<ExpositionSettings> {
    return Object.freeze({ ...this.settingsState })
  }

  private emit(eventName: ExpositionEventNames): void {
    this.emitter.emit(eventName, this.values, this.settings)
  }

  public reset(scenariosToReset: (keyof ExpositionState<T>)[] = []): Exposition<T> {
    Object.assign(this.state, resetExpositionValues(this.state, scenariosToReset))

    this.emit(EventNames.RESET)

    return this
  }

  public update(newValues: Partial<ExpositionValues<ExpositionState<T>>>): Exposition<T> {
    Object.assign(this.state, updateExpositionValues(this.state, newValues))

    this.emit(EventNames.UPDATE)

    return this
  }

  public updateSettings(newSettings: Partial<ExpositionSettings>): Exposition<T> {
    this.assignNewSettings(newSettings)

    this.emit(EventNames.UPDATE_SETTINGS)

    return this
  }

  private assignNewSettings(newSettings: Partial<ExpositionSettings>): void {
    Object.assign(this.settingsState, { ...this.settingsState, ...newSettings })
  }

  public on<Event extends ExpositionEventNames>(event: Event, handler: (values: ExpositionValues<ExpositionState<T>>, settings: ExpositionSettings) => void): Exposition<T> {
    this.emitter.on(event, handler)

    return this
  }

  public use<Tfn extends (context: Exposition<T>, settings: TSettings) => TfnR, TSettings = Parameters<Tfn>[1], TfnR = ReturnType<Tfn>>(integrationFunction: Tfn, settings: Parameters<Tfn>[1]): TfnR {
    return integrationFunction(this, settings)
  }

  public init(): Exposition<T> {
    if (!this.initialized) {
      this.initialized = true
      this.emit(EventNames.INITIALIZED)
    }

    return this
  }
}

