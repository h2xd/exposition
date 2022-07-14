import type { CustomInspectorNode } from '@vue/devtools-api'
import { setupDevtoolsPlugin } from '@vue/devtools-api'
import type { Exposition, ExpositionValues } from '@exposition/core'

import { expositionLabel, id, inspectorId, stateType, timelineId } from '../utils/config'
import type { DevtoolsContext } from '../@types/api'
import { createSettingsViews } from '../views/createSettingsViews'
import { actionLog, log } from '../utils/logs'
import { defineDevToolsSettings } from './defineDevToolsSettings'
import { defineExpositionState } from './defineExpositionState'

/**
 * View debugger by running:
 * `localStorage.debug = 'exposition:*'`
 * _Do not forget to set the logging setting to `verbose` in your browser_
 */

export function setupDevtools<T extends Exposition<any>>(app: any, options: { exposition: T; onUpdate: (exposition: ExpositionValues<T>, enabled: boolean) => void }) {
  const settings = defineDevToolsSettings()
  const state = defineExpositionState(options.exposition)

  state.loadFromStore()
  options.onUpdate(state.getValues(), settings.isEnabled('active'))

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
    }

    function updateState(beforeUpdateHandler: Function = () => undefined): () => void {
      return function () {
        beforeUpdateHandler()
        log('Updating values to: %s', JSON.stringify(state.getValues()))

        options.onUpdate(state.getValues(), settings.isEnabled('active'))

        api.sendInspectorState(inspectorId)
        api.sendInspectorTree(inspectorId)

        api.addTimelineEvent({
          layerId: timelineId,
          event: {
            title: 'updateExposition',
            time: api.now(),
            data: state.getValues(),
          },
        })
      }
    }

    api.addTimelineLayer({
      id: timelineId,
      label: expositionLabel,
      color: 0x6004DB,
    })

    api.addInspector({
      id: inspectorId,
      label: 'Exposition',
      icon: 'auto_stories',
      actions: [
        {
          icon: 'restore',
          tooltip: 'Reset the exposition to its initial state',
          action: updateState(() => {
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

    createSettingsViews(context, updateState())

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
                      action: updateState(() => {
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
                      action: updateState(() => {
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
  })
}
