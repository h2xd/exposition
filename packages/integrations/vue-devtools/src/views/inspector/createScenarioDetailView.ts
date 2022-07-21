import type { Exposition } from '@exposition/core'
import type { DevtoolsContext } from '../../@types/api'
import { inspectorId } from '../../config'

export function createScenarioDetailView<T extends Exposition<any>>(context: DevtoolsContext<T>) {
  const { api, exposition } = context

  api.on.getInspectorState((payload) => {
    if (payload.inspectorId !== inspectorId)
      return

    if (!Object.keys(exposition.values).includes(payload.nodeId))
      return

    const key = payload.nodeId
    const value = exposition.values[key]
    const initialValue = exposition.initialValues[key]

    payload.state = {
      state: [
        {
          key: 'scenario',
          value: key,
        },
        {
          key: 'initialValue',
          value: initialValue,
        },
        {
          key: 'value',
          value: {
            _custom: {
              type: null,
              value,
              actions: [{
                icon: 'restore',
                tooltip: 'Reset the value of the scenario',
                action: () => {
                  exposition.update({
                    [key]: initialValue,
                  })
                },
              }],
            },
          },
          editable: false,
        },
      ],
      // @ts-expect-error - TODO: Massive hack, there should be an option to interact with
      options: exposition.state[key].options.map((option, index) => {
        return {
          key: index,
          value: {
            _custom: {
              type: null,
              value: option,
              actions: [{
                icon: 'check',
                tooltip: `Set "${option}" as the new value`,
                action: () => {
                  exposition.update({
                    [key]: option,
                  })
                },
              }],
            },
          },
          editable: false,
        }
      }),
    }
  })
}
