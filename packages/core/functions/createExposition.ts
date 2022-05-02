import type { Exposition, ExpositionConfig } from '../@types/exposition'

/**
 * Create an Exposition with all necessary data 🔮
 *
 * ✨ Cast the input config `as const` to get full type support
 *
 * - The key of the entry will be used for the name of the `Scenario`
 * - The first `options` value will be set as the `initialValue` of the `Scenario`
 *
 * @param config
 * @returns `Exposition`
 * @example
  const exposition = createExposition({
    auth: {
      options: ['valid ✅', 'deny ❌']
    }
  } as const)
 */
export function createExposition<T extends ExpositionConfig>(config: T): Exposition<T> {
  return Object.keys(config).reduce((accumulator, key) => {
    const { options } = config[key]

    const firstOptionValue = options[0]

    return {
      ...accumulator,
      [key]: {
        id: key,
        options,
        initialValue: firstOptionValue,
        value: firstOptionValue,
      },
    }
  }, {} as Exposition<T>)
}
