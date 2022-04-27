import type { Exposition, ExpositionConfig, ExpositionScenarioConfig } from '../@types/exposition'
import type { Scenario } from '../@types/scenario'

function expostionConfigToScenario<T extends ExpositionScenarioConfig>(name: string, config: T): Scenario<T['options'][number]['value']> {
  const { description, options } = config
  const firstOptionValue = options[0].value

  return {
    name,
    description,
    options,
    initialValue: firstOptionValue,
    value: firstOptionValue,
  }
}

/**
 * Create an Exposition with with all nessisary data for future usages 🔮
 *
 * - The key of the entry will be used for the name of the `Scenario`.
 * - The first `options` value will be set as the `initialValue` of the `Scenario`
 *
 * @param config
 * @returns Record<string, Scenario>
 * @example
  const config = createExposition({
    auth: {
      description: 'Define how the Authentication-Service should respond to your requests',
      options: [
        {
          label: 'All requests will be authorized ✅',
          value: 'valid'
        },
        {
          label: 'All requests will be denied ❌',
          value: 'deny'
        }
      ]
    }
  })
 */
export function createExposition<
  T extends ExpositionConfig,
>(config: T): Exposition<T> {
  return Object.keys(config).reduce((accumulator, key) => {
    return {
      ...accumulator,
      [key]: expostionConfigToScenario(key, config[key]),
    }
  }, {} as Exposition<T>)
}
