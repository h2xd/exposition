import type { Exposition } from '@exposition/core'
import type { DevtoolsContext } from '../../@types/api'
import { inspectorId } from '../../config'

function flattenObject(ob: any) {
  const toReturn: Record<string, string> = {}

  for (const i in ob) {
    // eslint-disable-next-line no-prototype-builtins
    if (!ob.hasOwnProperty(i))
      continue

    if ((typeof ob[i]) == 'object' && ob[i] !== null) {
      const flatObject = flattenObject(ob[i])
      for (const x in flatObject) {
        // eslint-disable-next-line no-prototype-builtins
        if (!flatObject.hasOwnProperty(x))
          continue

        toReturn[`${i}.${x}`] = flatObject[x]
      }
    }
    else {
      toReturn[i] = ob[i]
    }
  }
  return toReturn
}

export function createScenarioDetailView<T extends Exposition<any>>(context: DevtoolsContext<T>) {
  const { api, exposition } = context

  api.on.getInspectorState((payload) => {
    if (payload.inspectorId !== inspectorId)
      return

    if (!Object.keys(flattenObject(exposition.values)).includes(payload.nodeId))
      return

    let state = exposition.getState()
    const pathItems = payload.nodeId.split('.')
    if (pathItems.length > 0) {
      pathItems.forEach((item) => {
        // @ts-expect-error - exposition does not know all item types
        state = state[item]
      })
    }

    const key = payload.nodeId
    const value = state.value
    const initialValue = state.initialValue

    function createUpdateTree(updateValue: string) {
      return pathItems.reduceRight((previousValue, key, currentIndex, array) => {
        if (currentIndex === array.length - 1) {
          return {
            ...previousValue,
            [key]: updateValue,
          }
        }

        return {
          [key]: previousValue,
        }
      }, {})
    }

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
                  // @ts-expect-error - initialValue is not being map right
                  exposition.update(createUpdateTree(initialValue))
                },
              }],
            },
          },
          editable: false,
        },
      ],
      // @ts-expect-error - TODO: Massive hack, there should be an option to interact with
      options: state.options.map((option, index) => {
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
                  exposition.update(createUpdateTree(option))
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
