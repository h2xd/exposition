import { setupDevtoolsPlugin } from '@vue/devtools-api'
import type { Exposition } from '@exposition/core'

import { expositionLabel, id, stateType } from '../utils/config'
import type { DevtoolsContext, OnUpdateHandler } from '../@types/api'
import { createSettingsViews } from '../views/createSettingsViews'
import { createTimelineViews } from '../views/createTimelineViews'
import { createInspectorViews } from '../views/createInspectorViews'
import { defineDevtoolsSettings } from './defineDevtoolsSettings'
import { defineExpositionState } from './defineExpositionState'
import { updateState } from './updateState'

/**
 * View debugger by running:
 * `localStorage.debug = 'exposition:*'`
 * _Do not forget to set the logging setting to `verbose` in your browser_
 */

export function setupDevtools<T extends Exposition<any>>(app: any, options: { exposition: T; onUpdate: OnUpdateHandler<T> }) {
  const settings = defineDevtoolsSettings()
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
