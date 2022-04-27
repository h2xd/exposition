import type { Exposition, FastExpositionConfig } from '../@types/exposition'

/**
 * Speedrun the Exposition creation process
 *
 * _Useful for PoCs or small projects_
 *
 * IMPORTANT: For full type support the given config parameter needs to be casted with `as const`
 *
 * - The key of the entry will be used for he name of the `Scenario`.
 * - The values will be used as the options of the `Scenario`
 * - The first value will be set as the `initialValue` of the `Scenario`
 *
 * Hint: Try out the autocomplete function of your IDE.
 * Press CMD/CTRL + SPACE to see the values of the current selected `Scenario`.
 * You can also hover over the `initialValue` an discover that the types
 * are being correctly passed to by the `createExpositionFast` function. ✨
 *
 * @param config
 * Initial configuration of the scenario
 * has to be casted with `as const` to provide typeings
 * @returns Exposition
 * @example
  const config = createExpositionFast({
    user: ['online', 'offline'],
  } as const)
 */
export function createExpositionFast<T extends FastExpositionConfig>(config: T): Exposition<T> {
  return Object.keys(config).reduce((accumulator, key) => {
    const values = config[key]

    return {
      ...accumulator,
      [key]: {
        name: key,
        options: values.map(value => ({ value })),
        initialValue: values[0],
        value: values[0],
      },
    }
  }, {} as Exposition<T>)
}
