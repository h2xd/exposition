import type { CustomInspectorNode } from '@vue/devtools-api'
import { setupDevtoolsPlugin } from '@vue/devtools-api'
import type { Exposition, ExpositionValues } from '@exposition/core'
import { getExpositionValues, resetExpositionValues, updateExpositionValues } from '@exposition/core'
import { readFromLocalStorage, writeToLocalStorage } from '@exposition/web'
import debug from 'debug'
import { version } from '../../package.json'
import { defineDevToolsSettings } from './settings'

/**
 * View debugger by running:
 * `localStorage.debug = 'exposition:*'`
 * _Do not forget to set the logging setting to `verbose` in your browser_
 */
const log = debug('exposition:vue-devtools')
const actionLog = log.extend('action')

export function setupDevtools<T extends Exposition<any>>(app: any, options: { exposition: T; onUpdate: (exposition: ExpositionValues<T>) => void }) {
  const id = `@exposition/vue-devtools/${version}`

  const stateType = 'My Awesome Plugin state'
  const inspectorId = `${id}/inspector`
  const timelineId = `${id}/timeline`
  const expositionLabel = '📖 Exposition'
  const settings = defineDevToolsSettings()

  let internalExpositionState: T = { ...options.exposition }

  const fromLocalStorage = readFromLocalStorage<T>()

  if (settings.value[1].value && fromLocalStorage)
    internalExpositionState = updateExpositionValues(internalExpositionState, fromLocalStorage)

  return setupDevtoolsPlugin({
    id,
    label: expositionLabel,
    packageName: '@exposition/vue-devtools',
    homepage: 'https://github.com/h2xd/exposition',
    componentStateTypes: [stateType],
    app,
  }, (api) => {
    function updateState(beforeUpdateHandler: Function): () => void {
      return function () {
        beforeUpdateHandler()
        const values = getExpositionValues(internalExpositionState)

        log('Updating values to: %s', JSON.stringify(values))

        options.onUpdate({ ...values })

        if (settings.value[1].value)
          writeToLocalStorage(internalExpositionState)

        api.sendInspectorState(inspectorId)
        api.sendInspectorTree(inspectorId)

        api.addTimelineEvent({
          layerId: timelineId,
          event: {
            title: 'updateExposition',
            time: api.now(),
            data: { ...values },
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
            internalExpositionState = resetExpositionValues(internalExpositionState)
          }),
        },
        {
          icon: 'save',
          tooltip: 'Save the current state to the localStorage',
          action: () => {
            actionLog('clicked save to localStorage action')
            writeToLocalStorage(internalExpositionState)
          },
        },
      ],
    })

    api.on.getInspectorTree((payload) => {
      if (payload.inspectorId === inspectorId) {
        const scenarioElements = Object.keys(internalExpositionState).reduce((accumulator, key) => {
          const { id, value, initialValue } = internalExpositionState[key]

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

    api.on.editInspectorState((payload) => {
      if (payload.inspectorId === inspectorId) {
        if (payload.nodeId === 'settings') {
          const updatedKey = payload.path[0]

          settings.value.forEach((item) => {
            if (item.key !== updatedKey)
              return item

            item.value = payload.state.value
          })

          settings.saveSettings()
          writeToLocalStorage(internalExpositionState)
        }
      }
    })

    api.on.getInspectorState((payload) => {
      if (payload.inspectorId === inspectorId) {
        if (payload.nodeId === 'settings') {
          payload.state = {
            settings: settings.value,
          }
        }

        if (payload.nodeId === 'scenarios') {
          payload.state = {
            // @ts-expect-error - figure out why TypeScript is angry
            scenarios: Object.keys(internalExpositionState).reduce((accumulator, key) => {
              return [
                ...accumulator,
                {
                  key,
                  value: internalExpositionState[key].value,
                },
              ]
            }, []),
          }
        }

        if (Object.keys(internalExpositionState).includes(payload.nodeId)) {
          const scenario = internalExpositionState[payload.nodeId]

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
                        internalExpositionState = updateExpositionValues(internalExpositionState, {
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
                        internalExpositionState = updateExpositionValues(internalExpositionState, {
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
