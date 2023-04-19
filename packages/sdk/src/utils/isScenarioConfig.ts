import type { ExpositionConfigOption } from '../@types/exposition'
import type { ScenarioConfig } from '../@types/scenario'

export function isScenarioConfig(config: ExpositionConfigOption): config is ScenarioConfig<string> {
  return Object.keys(config).includes('options')
}
