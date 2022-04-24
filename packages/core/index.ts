/**
 * Main dataset for the options API
 */
export type Scenario<Value extends string> = {
  /**
   * Name of the scenario that might also
   * be displayed to the developer
   */
  name: string
  /**
   * Visible inside the possible UI to provide
   * the developer some sort of context
   */
  description?: string
  initialValue: Value
  options: ScenarioOption<Value>[]
}

type ScenarioOption<Value extends string> = {
  /**
   * Provide the developer context of the outcome,
   * when this option is selected
   */
  label?: string
  value: Value
}

export type ScenarioValueMap<T extends Record<string, Scenario<any>>> = {
  [K in keyof T]: T[K]['options'][number]['value']
}


type Unwrap<T extends string[]> = ((...t: T) => void) extends ((...r: infer R) => void) ? [...R] : never

// @ts-expect-error
function createFastScenarioConfig<T extends Readonly<Record<string, Readonly<Unwrap<T[K]>>>>, K extends keyof T>(config: T) {
  return Object.keys(config).reduce((accumulator, key) => {
    const values = config[key]

    return {
      ...accumulator,
      [key]: {
        name: key,
        options: values.map(value => { value }),
        initialValue: values[0]
      }
    }
  }, {} as {
    [KV in keyof T]: Scenario<T[K][number]>
  })
}


const config = createFastScenarioConfig({
  'yo': ['whats', 'up']
} as const)


config.yo.initialValue = 'dwd'