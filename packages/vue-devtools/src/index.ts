import type { App } from 'vue'
import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { version } from '../package.json'
import type { Exposition } from '../../core'

// Our plugin

export default function setupDevtools(app, options: { exposition: Exposition }) {
  console.log(options)

  const id = `@exposition/vue-devtools/${version}`

  const stateType = 'My Awesome Plugin state'
  const inspectorId = `${id}/inspector`

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
        const scenarioElements = Object.keys(options.exposition).reduce((accumulator, key) => {
          const { name } = options.exposition[key]

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
            scenarios: Object.keys(options.exposition).reduce((accumulator, key) => {
              return [
                ...accumulator,
                {
                  key,
                  value: options.exposition[key].value,
                },
              ]
            }, []),
          }
        }

        if (Object.keys(options.exposition).includes(payload.nodeId)) {
          const scenario = options.exposition[payload.nodeId]

          payload.state = {
            section: [
              {
                key: scenario.name,
                value: scenario.value,
                editable: false,
              },
            ],
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
