import type { Exposition } from '@exposition/core'
import type { CustomInspectorNode } from '@vue/devtools-api'

import type { DevtoolsContext } from '../@types/api'
import { updateState } from '../utils'
import { inspectorId, warningLabelSettings } from '../config'
import { createMainScenarioView, createScenarioDetailView } from './inspector'

export function createInspectorViews<T extends Exposition<any>>(context: DevtoolsContext<T>) {
  const { api, state, settings } = context

  api.addInspector({
    id: inspectorId,
    label: 'Exposition',
    icon: 'auto_stories',
    actions: [
      {
        icon: 'restore',
        tooltip: 'Reset the exposition to its initial state',
        action: () => updateState(context, () => {
          state.reset()
        }),
      },
    ],
  })

  api.on.getInspectorTree((payload) => {
    if (payload.inspectorId === inspectorId) {
      const scenarioElements = Object.keys(state.value).reduce((accumulator, key) => {
        const { id, value, initialValue } = state.value[key]

        const isInitialValue = value === initialValue

        return [
          ...accumulator,
          {
            id,
            label: id,
            tags: !isInitialValue
              ? [

                  { ...warningLabelSettings, label: 'modified' },
                ]
              : [],
          },
        ]
      }, [] as CustomInspectorNode[])

      payload.rootNodes = [
        {
          id: 'settings',
          label: 'Settings',
          tags: !settings.isEnabled('active')
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
    }
  })

  createMainScenarioView(context)
  createScenarioDetailView(context)
}
