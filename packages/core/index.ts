
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
  options: ReadonlyArray<{
    /**
     * Provide the developer context of the outcome,
     * when this option is selected
     */
    label: string
    value: Value
  }>
}
