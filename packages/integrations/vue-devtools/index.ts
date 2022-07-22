import { setupDevtoolsPlugin } from '@vue/devtools-api'
import type { Exposition } from '@exposition/core'

import { readFromLocalStorage, writeToLocalStorage } from '@exposition/web'
import type { DevtoolsContext } from './src/@types/api'
import { createTimelineEvent, updateDevtools } from './src/hooks'
import { expositionLabel, id, localStorageSettingsKey, stateType } from './src/config'
import { createInspectorViews, createSettingsViews, createTimelineViews } from './src/views'

export function setupDevtools<T extends Exposition<any>>(app: any, options: { exposition: T }) {
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
      exposition,
    }

    function main(): void {
      loadSettingsFromLocalStorage()
      readFromLocalStorage(exposition)

      addExpositionHooks()

      createSettingsViews(context)
      createTimelineViews(context)
      createInspectorViews(context)
    }

    function loadSettingsFromLocalStorage() {
      const settingsFromLocalStorage = window.localStorage.getItem(localStorageSettingsKey)

      if (!settingsFromLocalStorage)
        return

      try {
        exposition.updateSettings(JSON.parse(settingsFromLocalStorage))
      }
      catch (error) {
        console.error('Failed updating the exposition settings', { error })
      }
    }

    function addExpositionHooks() {
      exposition.on('update', () => {
        updateDevtools(context)
        createTimelineEvent('update state', context)

        writeToLocalStorage(exposition)
      })

      exposition.on('reset', () => {
        updateDevtools(context)
        createTimelineEvent('reset state', context)
      })

      exposition.on('updateSettings', () => {
        updateDevtools(context)
        createTimelineEvent('update settings', context)
        window.localStorage.setItem(localStorageSettingsKey, JSON.stringify(exposition.settings))
      })
    }

    main()
  })
}
