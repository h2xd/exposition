import type { DevtoolsPluginApi, ExtractSettingsTypes, PluginSettingsItem } from '@vue/devtools-api'
import type { ExpositionState, ExpositionValues } from '@exposition/core'

import type { defineDevtoolsSettingsState, defineExpositionState } from '../states'

export type DevtoolsApi = DevtoolsPluginApi<ExtractSettingsTypes<Record<string, PluginSettingsItem>>>
export type DevtoolsExpositionState<T extends ExpositionState<any>> = ReturnType<typeof defineExpositionState<T>>
export type DevtoolsSettings = ReturnType<typeof defineDevtoolsSettingsState>

export interface DevtoolsContext<T extends ExpositionState<any>> {
  api: DevtoolsApi
  state: DevtoolsExpositionState<T>
  settings: DevtoolsSettings
  onUpdate: OnUpdateHandler<T>
}

export type OnUpdateHandler<T extends ExpositionState<any>> = (exposition: ExpositionValues<T>, enabled: boolean) => void
