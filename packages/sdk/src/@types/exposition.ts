import type { Scenario, ScenarioConfig } from './scenario'

export interface ExpositionConfig {
  readonly [key: string]: ExpositionConfigOption
}

export type ExpositionConfigOption = ScenarioConfig<string> | ExpositionConfig

export type ExpositionState<T extends ExpositionConfig> = {
  [K in keyof T]: T[K] extends ScenarioConfig<string> ? Scenario<T[K]['options'][number]> : (T[K] extends ExpositionConfig ? ExpositionState<T[K]> : never)
}

export type ExpositionValues<T extends ExpositionState<ExpositionConfig>> = {
  [K in keyof T]: T[K] extends Scenario<T[K]['options'][number]> ? T[K]['options'][number] : (T[K] extends ExpositionState<T[K]> ? ExpositionValues<T[K]> : never)
}
