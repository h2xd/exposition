export interface Scenario<TOption extends string> {
  /**
   * Id of the scenario that will also be displayed
   * in Development-Tools
   */
  id: string
  value: TOption
  initialValue: TOption
  options: TOption[]
}

export interface ScenarioConfig<TOption extends string> {
  options: ReadonlyArray<TOption>
}
