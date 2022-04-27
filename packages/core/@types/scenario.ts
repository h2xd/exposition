/**
 * Main dataset for the options API
 * @example
  const scenarioUser: Scenario<'valid' | 'unreachable'> = {
    name: 'user:email',
    description: 'Handle how the current state of the user email should look like',
    initialValue: 'valid',
    value: 'valid',
    options: [
      {
        label: 'User email is fully valid',
        value: 'valid'
      },
      {
        label: 'The email is unreachable',
        value: 'unreachable'
      }
    ]
  }
 */
export interface Scenario<Value extends string> {
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
  /**
   * The current value/state of the `Scenario`
   */
  value: Value
  /**
   * The initial value of the `Scenario`,
   * that can be used in reset handlers
   */
  initialValue: Value
  options: ScenarioOption<Value>[]
}

interface ScenarioOption<Value extends string> {
  /**
   * Provide the developer context of the outcome,
   * when this option is selected
   */
  label?: string
  value: Value
}

export type ScenarioFastConfig<T extends Record<string, string[]>> = {
  [K in keyof T]: Scenario<T[K][number]>
}
