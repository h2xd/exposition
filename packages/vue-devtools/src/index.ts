import type { App } from 'vue'
import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { version } from '../package.json'
import type { Exposition } from '../../core'
import { updateExpositionValues } from '../../core'

// Our plugin

export default function setupDevtools(app, options: { exposition: Exposition }) {
  console.log(options)

  const id = `@exposition/vue-devtools/${version}`

  const stateType = 'My Awesome Plugin state'
  const inspectorId = `${id}/inspector`

  let internalExpositionState: Exposition = { ...options.exposition }

  return setupDevtoolsPlugin({
    id,
    label: '📖 Exposition',
    packageName: '@exposition/vue-devtools',
    homepage: 'https://github.com/h2xd/exposition',
    componentStateTypes: [stateType],
    app,
  }, (api) => {
    api.addInspector({
      id: inspectorId,
      label: 'Exposition',
      icon: 'auto_stories',
      actions: [
        {
          icon: 'star',
          tooltip: 'Test custom action',
          action: () => console.log('Meow! 🐱'),
        },
      ],
      nodeActions: [
        {
          icon: 'star',
          tooltip: 'Test node custom action',
          action: nodeId => console.log('Node action:', nodeId),
        },
      ],
    })

    api.on.getInspectorTree((payload, context) => {
      if (payload.inspectorId === inspectorId) {
        const scenarioElements = Object.keys(internalExpositionState).reduce((accumulator, key) => {
          const { name } = internalExpositionState[key]

          return [
            ...accumulator,
            {
              id: name,
              label: name,
            },
          ]
        }, [])

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

    api.on.getInspectorState((payload, context) => {
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
                value: scenario.name,
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
                    // tooltip: 'It\'s a test!',
                    actions: [{
                      icon: 'star',
                      tooltip: 'Test custom action',
                      action: () => console.log('Meow! 🐱'),
                    }],
                  },
                },
                editable: false,
              },

            ],
            options: scenario.options.map((option, index) => {
              return {
                key: option.label || index,
                value: {
                  _custom: {
                    type: null,
                    value: option.value,
                    actions: [{
                      icon: 'check',
                      tooltip: `Set "${option.value}" as the new value`,
                      action: () => {
                        internalExpositionState = updateExpositionValues(internalExpositionState, {
                          [scenario.name]: option.value,
                        })

                        api.sendInspectorState(inspectorId)
                      },
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

    // api.on.inspectComponent((payload, context) => {
    //   payload.instanceData.state.push({
    //     type: stateType,
    //     key: '$hello',
    //     value: 'yo',
    //     editable: false,
    //   })

    //   payload.instanceData.state.push({
    //     type: stateType,
    //     key: 'time counter',
    //     value: 'dio',
    //     editable: false,
    //   })
    // })

    // setInterval(() => {
    //   api.notifyComponentUpdate()
    // }, 5000)
  })
}
