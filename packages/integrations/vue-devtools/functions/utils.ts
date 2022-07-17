import type { Exposition } from '../../../core'
import type { DevtoolsContext } from '../@types/api'
import { inspectorId, timelineId } from '../utils/config'

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

export function updateState<T extends Exposition<any>>(
  context: DevtoolsContext<T>,
  beforeUpdateHandler?: (context: DevtoolsContext<T>) => void,
): void {
  if (beforeUpdateHandler)
    beforeUpdateHandler(context)

  const { state, api, settings, onUpdate } = context

  onUpdate(state.getValues(), settings.isEnabled('active'))

  api.sendInspectorState(inspectorId)
  api.sendInspectorTree(inspectorId)

  createTimelineEvent('update exposition', context)
}
