import type { Exposition } from '../../../core'
import type { DevtoolsContext } from '../@types/api'
import { inspectorId, timelineId } from '../utils/config'
import { log } from '../utils/logs'

export function createTimelineEvent<T extends Exposition<any>>(title: string, { api, state }: DevtoolsContext<T>): void {
  api.addTimelineEvent({
    layerId: timelineId,
    event: {
      title,
      time: api.now(),
      data: state.getValues(),
    },
  })
}

export function updateState<T extends Exposition<any>>(context: DevtoolsContext<T>): void {
  const { state, api, settings, onUpdate } = context

  log('Updating values to: %s', JSON.stringify(state.getValues()))

  onUpdate(state.getValues(), settings.isEnabled('active'))

  api.sendInspectorState(inspectorId)
  api.sendInspectorTree(inspectorId)

  createTimelineEvent('update exposition', context)
}

export function createUpdateStateHandler<T extends Exposition<any>>(beforeUpdateHandler: Function = () => undefined, context: DevtoolsContext<T>): () => void {
  return function () {
    beforeUpdateHandler()
    updateState(context)
  }
}
