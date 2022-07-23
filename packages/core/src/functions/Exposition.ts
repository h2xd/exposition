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

  /**
   * Create an Exposition instance and add integrations or build custom ones. 📙
   * @param config - create a Schema that will be exposed to integrations
   * @param options - change default options
   *
   * @example
    const exposition = new Exposition({
      stage: {
        options: ['🐛 Small', '🦋 Big']
      }
    } as const)
   * @example
    const exposition = new Exposition(
      {
        // ... your config
      },
      {
        settings: {
          active: false,
          restoreState: false,
        }
      }
    )
   */
  public constructor(config: T, options: PartialDeep<ExpositionContext> = {}) {
    this.state = createExpositionState(config)

    this.assignNewSettings(options?.settings || {})
  }

  /**
   * @returns - The current `Scenario` value of all elements
   */
  public get values(): ExpositionValues<ExpositionState<T>> {
    return getExpositionValues(this.state)
  }

  /**
   * @returns - The `initialValue` of all `Scenario` elements
   */
  public get initialValues(): ExpositionValues<ExpositionState<T>> {
    return getInitialExpositionValues(this.state)
  }

  /**
   * @returns - The current `Exposition` settings
   */
  public get settings(): Readonly<ExpositionSettings> {
    return Object.freeze({ ...this.settingsState })
  }

  private emit(eventName: ExpositionEventNames): void {
    this.emitter.emit(eventName, this.values, this.settings)
  }

  /**
   * Reset the `Scenario` elements of this instance
   * @param scenariosToReset - pick what `Scenario` elements should be set to their `initialValue`
   * @emits reset - after the values were reverted
   * @returns `Exposition`
   */
  public reset(scenariosToReset: (keyof ExpositionState<T>)[] = []): Exposition<T> {
    Object.assign(this.state, resetExpositionValues(this.state, scenariosToReset))

    this.emit(EventNames.RESET)

    return this
  }

  /**
   * Update a partial set of the given `Scenario` elements to a new state
   * @param newValues - new values for the next state
   * @emits update - after the `Scenario` elements were set to their new value
   * @returns `Exposition`
   */
  public update(newValues: Partial<ExpositionValues<ExpositionState<T>>>): Exposition<T> {
    Object.assign(this.state, updateExpositionValues(this.state, newValues))

    this.emit(EventNames.UPDATE)

    return this
  }

  /**
   * Update a partial set of the `Exposition` instance settings
   * @param newSettings - new values for the next settings state
   * @emits updateSettings - after the settings were set to their new value
   * @returns `Exposition`
   */
  public updateSettings(newSettings: Partial<ExpositionSettings>): Exposition<T> {
    this.assignNewSettings(newSettings)

    this.emit(EventNames.UPDATE_SETTINGS)

    return this
  }

  private assignNewSettings(newSettings: Partial<ExpositionSettings>): void {
    Object.assign(this.settingsState, { ...this.settingsState, ...newSettings })
  }

  /**
   *
   * @param event on which event should the handler react
   * @param handler custom handler that will be called when `Exposition` emits the given event
   * @example
    const exposition = new Exposition({
      stage: {
        options: ['🐛 Small', '🦋 Big']
      }
    } as const)

    exposition.on('update', (values, settings) => {
      console.log(values)
    })

    exposition.update({ stage: '🦋 Big' })

    // will trigger the console.log
    // console.log(values) -> { "stage": "🦋 Big" }
   */
  public on<Event extends ExpositionEventNames>(event: Event, handler: (values: ExpositionValues<ExpositionState<T>>, settings: ExpositionSettings) => void): Exposition<T> {
    this.emitter.on(event, handler)

    return this
  }

  /**
   * Add an integration to the `Exposition` context.
   *
   * @see {@link https://h2xd.github.io/exposition/packages/integrations.html @exposition/integrations}
   * @param integrationFunction integration handler that will be installed
   * @param settings integration settings that will be added to the integration function
   * @returns The return type of the `integrationFunction`
   */
  public use<Tfn extends (context: Exposition<T>, settings: TSettings) => TfnR, TSettings = Parameters<Tfn>[1], TfnR = ReturnType<Tfn>>(integrationFunction: Tfn, settings: Parameters<Tfn>[1]): TfnR {
    return integrationFunction(this, settings)
  }

  /**
   * Signal to all integrations that the setup is complete
   *
   * **Will only emit the `initialized` event once**
   */
  public init(): Exposition<T> {
    if (!this.initialized) {
      this.initialized = true
      this.emit(EventNames.INITIALIZED)
    }

    return this
  }
}

