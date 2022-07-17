import type { Exposition } from '@exposition/core'
import type { DevtoolsContext } from '../../@types/api'
import { updateState } from '../../utils'
import { inspectorId } from '../../config'

export function createMainScenarioView<T extends Exposition<any>>(context: DevtoolsContext<T>) {
  const { api, state } = context

  api.on.getInspectorState((payload) => {
    if (payload.inspectorId === inspectorId) {
      if (payload.nodeId === 'scenarios') {
        payload.state = {
          // @ts-expect-error - figure out why TypeScript is angry
          scenarios: Object.keys(state.getValues()).reduce((accumulator, key) => {
            const scenario = state.value[key]

            return [
              ...accumulator,
              {
                key,
                value: {
                  _custom: {
                    type: null,
                    value: state.value[key].value,
                    actions: [
                      {
                        icon: 'keyboard_arrow_down',
                        tooltip: 'Go to scenario',
                        action: () => api.selectInspectorNode(inspectorId, scenario.id),
                      },
                      {
                        icon: 'restore',
                        tooltip: 'Reset the value of the scenario',
                        action: () => updateState(context, () => {
                          // @ts-expect-error - Allow dynamic state definition in this case
                          state.update({
                            [scenario.id]: scenario.initialValue,
                          })
                        }),
                      },
                    ],
                  },
                },
              },
            ]
          }, []),
        }
      }
    }
  })
}
