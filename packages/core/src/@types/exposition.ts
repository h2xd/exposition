import type { EventNames } from '../config/eventNames'
import type { ExpositionState, ExpositionValues } from '../sdk'

export interface ExpositionContext<TState extends ExpositionState<any>> {
  values(): ExpositionValues<TState>
  reset(scenariosToReset?: (keyof TState)[]): void
  update(newValues: Partial<ExpositionValues<TState>>): void
  on(event: ExpositionEventNames, handler: (values: ExpositionValues<TState>) => void): void
}

export interface ExpositionIntegration<TSettings extends Object, TExpositionContext = ExpositionContext<any>> {
  [index: string | number | symbol]: any
  install(expositionContext: TExpositionContext, settings?: TSettings): void
}

export type ExpositionEventNames = typeof EventNames[keyof typeof EventNames]
