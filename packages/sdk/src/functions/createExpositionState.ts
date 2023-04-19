import type { ExpositionConfig, ExpositionState } from '../@types/exposition'
import { isScenarioConfig } from '../utils/isScenarioConfig'

/**
 * Create an Exposition state with all necessary data. 🔮
 *
 * - Cast the config `as const` to get full type support ✨
 * - The first `options` item will be set as the `initialValue` of the `Scenario`
 *
 * @param config
 * @param prependKey
 * @returns `ExpositionState`
 * @example
  const expositionState = createExpositionState({
    auth: {
      options: ['valid ✅', 'deny ❌']
    }
  } as const)
 */
export function createExpositionState<T extends ExpositionConfig>(config: T, prependKey?: string): ExpositionState<T> {
  return Object.keys(config).reduce((accumulator, key) => {
    const configItem = config[key]

    if (isScenarioConfig(configItem)) {
      const { options } = configItem

      const firstOptionValue = options[0]

      return {
        ...accumulator,
        [key]: {
          id: prependKey ? `${prependKey}.${key}` : key,
          options,
          initialValue: firstOptionValue,
          value: firstOptionValue,
        },
      }
    }

    return {
      ...accumulator,
      [key]: createExpositionState(configItem, key),
    }
  }, {} as ExpositionState<T>)
}
