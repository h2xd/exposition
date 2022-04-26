/**
 * Main dataset for the options API
 * @example
 * const scenarioUser: Scenario<'valid' | 'unreachable'> = {
 *   name: 'user:email',
 *   description: 'Handle how the current state of the user email should look like',
 *   initialValue: 'valid',
 *   options: [
 *     {
 *       label: 'User email is fully valid',
 *       value: 'valid'
 *     },
 *     {
 *       label: 'The email is unreachable',
 *       value: 'unreachable'
 *     }
 *   ]
 * }
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
  initialValue: Value
  value: Value
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

export type ScenarioMap = Record<string, Scenario<string>>

/**
 * Helper type to model a Record<string, string> that can be passed
 * to other interfaces
 * TODO: Add export / import types that accept this type
 *
 * @example
 * const UserScenario: Scenario<'gdi' | 'nod'> = {
 *   initialValue: 'gdi',
 *   name: 'user',
 *   options: [
 *     {
 *       value: 'gdi',
 *     },
 *     {
 *       value: 'nod'
 *     }
 *   ]
 * }
 *
 * const config = {
 *   user: UserScenario
 * }
 *
 * const ConfigValueMap: ScenarioValueMap<typeof config> = {
 *   user: 'gdi'
 * }
 */
export type ScenarioValueMap<T extends Record<string, Scenario<string>>> = {
  [K in keyof T]: T[K]['options'][number]['value']
}
