export interface ExpositionSettings {
  /**
   * Signal all integrations that they should stop their actions
   *
   * - [`@exposition/integrations/msw`](https://h2xd.github.io/exposition/integrations/msw.html) will reset all handler if this option is set to `false`
   */
  active: boolean
  /**
   * Signal all integrations that they should prevent all state restoration handler
   *
   * - [`@exposition/integrations/vue-devtools`](https://h2xd.github.io/exposition/integrations/vue-devtools.html) will not interact with the `localStorage` if this option is set to `false`
   */
  restoreState: boolean
}

export interface ExpositionContext {
  settings: ExpositionSettings
}
