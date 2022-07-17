import { setupDevtoolsPlugin } from '@vue/devtools-api'
import type { Exposition } from '@exposition/core'

import type { DevtoolsContext, OnUpdateHandler } from './src/@types/api'
import { defineDevtoolsSettingsState, defineExpositionState } from './src/states'
import { updateState } from './src/utils'
import { expositionLabel, id, stateType } from './src/config'
import { createInspectorViews, createSettingsViews, createTimelineViews } from './src/views'

export function setupDevtools<T extends Exposition<any>>(app: any, options: { exposition: T; onUpdate: OnUpdateHandler<T> }) {
  const settings = defineDevtoolsSettingsState()
  const state = defineExpositionState(options.exposition)

  return setupDevtoolsPlugin({
    id,
    label: expositionLabel,
    packageName: '@exposition/vue-devtools',
    homepage: 'https://h2xd.github.io/exposition/integrations/vue-devtools.html',
    componentStateTypes: [stateType],
    app,
  }, (api) => {
    const context: DevtoolsContext<T> = {
      api,
      settings,
      state,
      onUpdate: options.onUpdate,
    }

    function main(): void {
      createSettingsViews(context)
      createTimelineViews(context)
      createInspectorViews(context)

      state.loadFromStore()
      updateState(context)
    }

    main()
  })
}
