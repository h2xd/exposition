import type { DevtoolsPluginApi, ExtractSettingsTypes, PluginSettingsItem } from '@vue/devtools-api'
import type { Exposition } from '@exposition/core'

import type { defineDevtoolsSettingsState } from '../states/defineDevtoolsSettingsState'

export type DevtoolsApi = DevtoolsPluginApi<ExtractSettingsTypes<Record<string, PluginSettingsItem>>>
export type DevtoolsSettings = ReturnType<typeof defineDevtoolsSettingsState>

export interface DevtoolsContext<TExposition extends Exposition<any>> {
  api: DevtoolsApi
  exposition: TExposition
  settings: DevtoolsSettings
}
