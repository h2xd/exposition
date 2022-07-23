import type { ExpositionConfig, ExpositionState } from '../@types/exposition'

/**
 * Create an Exposition state with all necessary data. 🔮
 *
 * - Cast the config `as const` to get full type support ✨
 * - The first `options` item will be set as the `initialValue` of the `Scenario`
 *
 * @param config
 * @returns `ExpositionState`
 * @example
  const expositionState = createExpositionState({
    auth: {
      options: ['valid ✅', 'deny ❌']
    }
  } as const)
 */
export function createExpositionState<T extends ExpositionConfig>(config: T): ExpositionState<T> {
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
  }, {} as ExpositionState<T>)
}
