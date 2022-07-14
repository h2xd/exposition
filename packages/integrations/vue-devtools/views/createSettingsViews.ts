import type { Exposition } from '@exposition/core'
import type { DevtoolsContext } from '../@types/api'
import { inspectorId } from '../config'

const settingsNodeId = 'settings'

export function createSettingsViews<T extends Exposition<any>>({ api, settings, state }: DevtoolsContext<T>) {
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
    state.saveToStore()
  })

  api.on.getInspectorState((payload) => {
    if (payload.inspectorId !== inspectorId || payload.nodeId !== settingsNodeId)
      return

    payload.state = {
      settings: settings.value,
    }
  })
}
