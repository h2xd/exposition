import type { DevtoolsPluginApi, ExtractSettingsTypes, PluginSettingsItem } from '@vue/devtools-api'
import type { Exposition } from '@exposition/core'

export type DevtoolsApi = DevtoolsPluginApi<ExtractSettingsTypes<Record<string, PluginSettingsItem>>>

export interface DevtoolsContext<TExposition extends Exposition<any>> {
  api: DevtoolsApi
  exposition: TExposition
}
