import type { DevtoolsPluginApi, ExtractSettingsTypes, PluginSettingsItem } from '@vue/devtools-api'
import type { Exposition } from '@exposition/core'

import type { defineDevToolsSettings } from '../functions/settings'
import type { defineExpositionState } from '../functions/state'

export type DevtoolsApi = DevtoolsPluginApi<ExtractSettingsTypes<Record<string, PluginSettingsItem>>>
export type DevtoolsExpositionState<T extends Exposition<any>> = ReturnType<typeof defineExpositionState<T>>
export type DevtoolsSettings = ReturnType<typeof defineDevToolsSettings>

export interface DevtoolsContext<T extends Exposition<any>> {
  api: DevtoolsApi
  state: DevtoolsExpositionState<T>
  settings: DevtoolsSettings
}
