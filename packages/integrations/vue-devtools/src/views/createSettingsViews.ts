import type { Exposition } from '@exposition/core'
import { writeToLocalStorage } from '@exposition/web'
import type { DevtoolsContext } from '../@types/api'
import { inspectorId } from '../config'

const settingsNodeId = 'settings'

export function createSettingsViews<T extends Exposition<any>>(context: DevtoolsContext<T>) {
  const { api, exposition } = context

  api.on.getInspectorState((payload) => {
    if (payload.inspectorId !== inspectorId || payload.nodeId !== settingsNodeId)
      return

    payload.state = {
      state: Object.entries(exposition.settings).map(([key, value]) => {
        return {
          key,
          value,
          editable: true,
        }
      }),
    }
  })

  api.on.editInspectorState((payload) => {
    if (payload.inspectorId !== inspectorId || payload.nodeId !== settingsNodeId)
      return

    const key = payload.path[0] as keyof T['settings']
    const value = payload.state.value as T['settings'][typeof key]

    exposition.updateSettings({
      [key]: value,
    })

    if (exposition.settings.restoreState)
      writeToLocalStorage(exposition)
  })
}
