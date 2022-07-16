import type { Exposition } from '@exposition/core'
import type { CustomInspectorNode } from '@vue/devtools-api'
import type { DevtoolsContext } from '../@types/api'
import { updateState } from '../functions/updateState'
import { inspectorId } from '../utils/config'
import { actionLog } from '../utils/logs'

export function createInspectorViews<T extends Exposition<any>>(context: DevtoolsContext<T>) {
  const { api, state } = context

  function createUpdateStateHandler(beforeUpdateHandler: Function = () => undefined): () => void {
    return function () {
      beforeUpdateHandler()
      updateState(context)
    }
  }

  api.addInspector({
    id: inspectorId,
    label: 'Exposition',
    icon: 'auto_stories',
    actions: [
      {
        icon: 'restore',
        tooltip: 'Reset the exposition to its initial state',
        action: createUpdateStateHandler(() => {
          actionLog('clicked restore action')
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
            tags: [
              isInitialValue
                ? {
                    label: 'default',
                    textColor: 0xFFFFFF,
                    backgroundColor: 0x000000,
                  }
                : { label: 'modified', textColor: 0xFFC495, backgroundColor: 0xAF4C05 },
            ],
          },
        ]
      }, [] as CustomInspectorNode[])

      payload.rootNodes = [
        {
          id: 'settings',
          label: '⚙ Settings',
          tags: [
            {
              label: 'awesome',
              textColor: 0xFFFFFF,
              backgroundColor: 0x000000,
            },
          ],
        },
        {
          id: 'scenarios',
          label: '📕 Scenarios',
          children: scenarioElements,
        },
      ]
    }
  })

  api.on.getInspectorState((payload) => {
    if (payload.inspectorId === inspectorId) {
      if (payload.nodeId === 'scenarios') {
        payload.state = {
          // @ts-expect-error - figure out why TypeScript is angry
          scenarios: Object.keys(state.getValues()).reduce((accumulator, key) => {
            return [
              ...accumulator,
              {
                key,
                value: state.value[key].value,
              },
            ]
          }, []),
        }
      }

      if (Object.keys(state.value).includes(payload.nodeId)) {
        const scenario = state.value[payload.nodeId]

        payload.state = {
          state: [
            {
              key: 'scenario',
              value: scenario.id,
            },
            {
              key: 'initialValue',
              value: scenario.initialValue,
            },
            {
              key: 'value',
              value: {
                _custom: {
                  type: null,
                  value: scenario.value,
                  actions: [{
                    icon: 'restore',
                    tooltip: 'Reset the value of the scenario',
                    action: createUpdateStateHandler(() => {
                      actionLog('restore scenario %s settings', scenario.id)
                      // @ts-expect-error - Allow dynamic state definition in this case
                      state.update({
                        [scenario.id]: scenario.initialValue,
                      })
                    }),
                  }],
                },
              },
              editable: false,
            },
          ],
          // @ts-expect-error - figure out why TypeScript is angry
          options: scenario.options.map((option, index) => {
            return {
              key: index,
              value: {
                _custom: {
                  type: null,
                  value: option,
                  actions: [{
                    icon: 'check',
                    tooltip: `Set "${option}" as the new value`,
                    action: createUpdateStateHandler(() => {
                      actionLog('set new value "%s" for scenario "%s"', option, scenario.id)
                      // @ts-expect-error - Allow dynamic state definition in this case
                      state.update({
                        [scenario.id]: option,
                      })
                    }),
                  }],
                },
              },
              editable: false,
            }
          }),
        }
      }
    }
  })
}
