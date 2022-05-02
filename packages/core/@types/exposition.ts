import type { Scenario, ScenarioConfig } from './scenario'

export type ExpositionConfig = Readonly<Record<string, ScenarioConfig<string>>>

export type Exposition<T extends ExpositionConfig> = {
  [K in keyof T]: Scenario<T[K]['options'][number]>
}

export type ExpositionValues<T extends Exposition<ExpositionConfig>> = {
  [K in keyof T]: T[K]['options'][number]
}
