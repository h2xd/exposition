import type { Scenario } from './scenario'

export type ExpositionConfig = Record<string, ExpositionScenarioConfig>
export type ExpositionScenarioConfig = Pick<Scenario<string>, 'description' | 'options'>

export type Exposition<T extends ExpositionConfig> = {
  [K in keyof T]: Scenario<T[K]['options'][number]['value']>
}
