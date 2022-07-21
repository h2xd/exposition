import type { Exposition } from '@exposition/core'
import type { DevtoolsContext } from '../../@types/api'
import { inspectorId } from '../../config'

export function createMainScenarioView<T extends Exposition<any>>(context: DevtoolsContext<T>) {
  const { api, exposition } = context

  api.on.getInspectorState((payload) => {
    if (payload.inspectorId !== inspectorId)
      return

    if (payload.nodeId !== 'scenarios')
      return

    const initialValues = exposition.initialValues

    payload.state = {
      // @ts-expect-error - figure out why TypeScript is angry
      scenarios: Object.keys(exposition.values).reduce((accumulator, key) => {
        const value = exposition.values[key]

        return [
          ...accumulator,
          {
            key,
            value: {
              _custom: {
                type: null,
                value,
                actions: [
                  {
                    icon: 'keyboard_arrow_down',
                    tooltip: 'Go to scenario',
                    action: () => api.selectInspectorNode(inspectorId, key),
                  },
                  {
                    icon: 'restore',
                    tooltip: 'Reset the value of the scenario',
                    action: () => {
                      exposition.update({
                        [key]: initialValues[key],
                      })
                    },
                  },
                ],
              },
            },
          },
        ]
      }, []),
    }
  })
}
