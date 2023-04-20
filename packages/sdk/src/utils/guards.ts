import type { ExpositionConfigOption, ExpositionState } from '../@types/exposition'
import type { Scenario, ScenarioConfig } from '../@types/scenario'

export function isScenario(config: ExpositionState<any> | Scenario<any>): config is Scenario<any> {
  const keys = Object.keys(config)

  return ['id', 'value', 'initialValue', 'options'].every(key => keys.includes(key))
}

export function isScenarioConfig(config: ExpositionConfigOption): config is ScenarioConfig<string> {
  return Object.keys(config).includes('options')
}
