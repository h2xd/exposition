import type { Exposition } from '@exposition/core'
import { writeToLocalStorage } from '@exposition/web'
import type { DevtoolsContext } from '../@types/api'
import { inspectorId } from '../config'

const settingsNodeId = 'settings'

export function createSettingsViews<T extends Exposition<any>>(context: DevtoolsContext<T>) {
  const { api, settings, exposition } = context

  api.on.editInspectorState((payload) => {
    if (payload.inspectorId !== inspectorId || payload.nodeId !== settingsNodeId)
      return

    const updatedKey = payload.path[0]

    settings.value.forEach((item) => {
      if (item.key !== updatedKey)
        return item

      item.value = payload.state.value
    })

    settings.saveSettings()

    if (settings.isEnabled('autoLoadFromLocalStorage'))
      writeToLocalStorage(exposition)
  })

  api.on.getInspectorState((payload) => {
    if (payload.inspectorId !== inspectorId || payload.nodeId !== settingsNodeId)
      return

    payload.state = {
      settings: settings.value,
    }
  })
}
