import type { Scenario, ScenarioConfig } from './scenario'

export type ExpositionConfig = Readonly<Record<string, ScenarioConfig<string>>>

export type ExpositionState<T extends ExpositionConfig> = {
  [K in keyof T]: Scenario<T[K]['options'][number]>
}

export type ExpositionValues<T extends ExpositionState<ExpositionConfig>> = {
  [K in keyof T]: T[K]['options'][number]
}
