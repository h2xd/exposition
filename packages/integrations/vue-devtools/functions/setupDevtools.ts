import type { CustomInspectorNode } from '@vue/devtools-api'
import { setupDevtoolsPlugin } from '@vue/devtools-api'
import type { Exposition, ExpositionValues } from '@exposition/core'
import { getExpositionValues, resetExpositionValues, updateExpositionValues } from '@exposition/core'
import { writeToLocalStorage } from '@exposition/web'
import debug from 'debug'
import { version } from '../../package.json'

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

  let internalExpositionState: T = { ...options.exposition }

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
        api.sendInspectorState(inspectorId)
        const values = getExpositionValues(internalExpositionState)

        log('Updating values to: %s', JSON.stringify(values))

        options.onUpdate({ ...values })

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
          const { id } = internalExpositionState[key]

          return [
            ...accumulator,
            {
              id,
              label: id,
            },
          ]
        }, [] as CustomInspectorNode[])

        payload.rootNodes = [
          {
            id: 'settings',
            label: '📖 Exposition',
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
        if (payload.nodeId === 'settings') {
          payload.state = {
            settings: [{
              key: 'active',
              value: true,
              editable: true,
            }],
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
