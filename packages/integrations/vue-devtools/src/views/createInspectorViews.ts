import type { Exposition } from '@exposition/core'

import type { DevtoolsContext } from '../@types/api'
import { inspectorId, warningLabelSettings } from '../config'
import { createMainScenarioView, createScenarioDetailView } from './inspector'

export function createInspectorViews<T extends Exposition<any>>(context: DevtoolsContext<T>) {
  const { api, exposition } = context

  api.addInspector({
    id: inspectorId,
    label: 'Exposition',
    icon: 'auto_stories',
    actions: [
      {
        icon: 'restore',
        tooltip: 'Reset the exposition to its initial state',
        action: () => {
          exposition.reset()
        },
      },
    ],
  })

  api.on.getInspectorTree((payload) => {
    if (payload.inspectorId !== inspectorId)
      return

    const initialValues = exposition.initialValues

    const scenarioElements = Object.entries(exposition.values).map(([key, value]) => {
      const isInitialValue = value === initialValues[key]

      return {
        id: key,
        label: key,
        tags: !isInitialValue
          ? [

              { ...warningLabelSettings, label: 'modified' },
            ]
          : [],
      }
    })

    payload.rootNodes = [
      {
        id: 'settings',
        label: 'Settings',
        tags: !exposition.settings.active
          ? [
              {
                ...warningLabelSettings,
                label: 'mocking inactive',
              },
            ]
          : [],
      },
      {
        id: 'scenarios',
        label: 'Scenarios',
        children: scenarioElements,
      },
    ]
  })

  createMainScenarioView(context)
  createScenarioDetailView(context)
}
