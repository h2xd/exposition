import { setupDevtoolsPlugin } from '@vue/devtools-api'
import type { Exposition } from '@exposition/core'

import type { DevtoolsContext, OnUpdateHandler } from './@types/api'
import { defineDevtoolsSettings } from './functions/defineDevtoolsSettings'
import { defineExpositionState } from './functions/defineExpositionState'
import { updateState } from './functions/utils'
import { expositionLabel, id, stateType } from './utils/config'
import { createInspectorViews } from './views/createInspectorViews'
import { createSettingsViews } from './views/createSettingsViews'
import { createTimelineViews } from './views/createTimelineViews'

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
