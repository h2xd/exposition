import { setupDevtoolsPlugin } from '@vue/devtools-api'
import type { Exposition } from '@exposition/core'

import { readFromLocalStorage, writeToLocalStorage } from '@exposition/web'
import type { DevtoolsContext } from './src/@types/api'
import { defineDevtoolsSettingsState } from './src/states/defineDevtoolsSettingsState'
import { createTimelineEvent, updateDevtools } from './src/hooks'
import { expositionLabel, id, stateType } from './src/config'
import { createInspectorViews, createSettingsViews, createTimelineViews } from './src/views'

export function setupDevtools<T extends Exposition<any>>(app: any, options: { exposition: T }) {
  const settings = defineDevtoolsSettingsState()
  const { exposition } = options

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
      exposition,
    }

    function main(): void {
      loadPreviousState()
      addExpositionHooks()
      createSettingsViews(context)
      createTimelineViews(context)
      createInspectorViews(context)
    }

    function loadPreviousState() {
      if (settings.isEnabled('autoLoadFromLocalStorage'))
        readFromLocalStorage(exposition)
    }

    function addExpositionHooks() {
      exposition.on('update', () => {
        updateDevtools(context)
        createTimelineEvent('update state', context)

        if (settings.isEnabled('autoLoadFromLocalStorage'))
          writeToLocalStorage(exposition)
      })
    }

    main()
  })
}
