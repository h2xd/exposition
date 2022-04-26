import type { ScenarioMap } from '@exposition/core'

type Readable<T extends Record<string, ReadonlyArray<string>>> = {
  /**
   * Unpack the values with [number] and pack them back into an Array.
   * By doing so we can remove the readonly flag on the given values.
   */
  [K in keyof T]: T[K][number][]
}

/**
 * Create ScenarioMap with minimal affort.
 * IMPORTANT: For full type support the given config parameter needs to be casted with `as const`
 *
 * - The key of the entry will be used for he name of the `Scenario`.
 * - The values will be used as the options of the `Scenario`
 * - The first value will be set as the `initialValue` of the `Scenario`
 *
 * Hint: Try out the autocomplete function of your IDE.
 * Press CMD/CTRL + SPACE to see the values of the current selected `Scenario`.
 * You can also hover over the `initialValue` an discover that the types
 * are being correctly passed to by the `createFastScenarioConfig` function. ✨
 *
 * @example
 * const config = createFastScenarioConfig({
 *  user: ['online', 'offline'],
 * } as const)
 *
 * @param config
 * Initial configuration of the scenario
 * has to be casted with `as const` to provide typeings
 *
 * @returns Record<string, Scenario>
 */
export function createFastScenarioConfig<T extends Record<string, ReadonlyArray<string>>>(config: T): ScenarioMap<Readable<T>> {
  return Object.keys(config).reduce((accumulator, key) => {
    const values = config[key]

    return {
      ...accumulator,
      [key]: {
        name: key,
        options: values.map((value) => { value }),
        initialValue: values[0],
      },
    }
  }, {} as ScenarioMap<Readable<T>>)
}
