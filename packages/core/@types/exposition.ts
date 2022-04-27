import type { Scenario } from './scenario'

export type ExpositionConfig = Record<string, ExpositionScenarioConfig>
export type ExpositionScenarioConfig = Pick<Scenario<string>, 'description' | 'options'>

export type Exposition<T extends ExpositionConfig> = {
  [K in keyof T]: Scenario<T[K]['options'][number]['value']>
}

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
export type ExpositionValues<T extends Record<string, Scenario<string>>> = {
  [K in keyof T]: T[K]['options'][number]['value']
}
