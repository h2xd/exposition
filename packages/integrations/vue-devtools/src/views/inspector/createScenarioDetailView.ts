import type { ExpositionState } from '@exposition/core'
import type { DevtoolsContext } from '../../@types/api'
import { updateState } from '../../utils'
import { inspectorId } from '../../config'

export function createScenarioDetailView<T extends ExpositionState<any>>(context: DevtoolsContext<T>) {
  const { api, state } = context

  api.on.getInspectorState((payload) => {
    if (payload.inspectorId === inspectorId) {
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
                    action: () => updateState(context, () => {
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
                    action: () => updateState(context, () => {
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
