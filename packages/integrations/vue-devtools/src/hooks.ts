import type { Exposition } from '@exposition/core'
import type { DevtoolsContext } from './@types/api'
import { inspectorId, timelineId } from './config'

export function createTimelineEvent<T extends Exposition<any>>(title: string, { api, exposition }: DevtoolsContext<T>): void {
  api.addTimelineEvent({
    layerId: timelineId,
    event: {
      title,
      time: api.now(),
      data: exposition.values,
    },
  })
}

export function updateDevtools<T extends Exposition<any>>(
  context: DevtoolsContext<T>,
): void {
  const { api } = context

  api.sendInspectorState(inspectorId)
  api.sendInspectorTree(inspectorId)
}
