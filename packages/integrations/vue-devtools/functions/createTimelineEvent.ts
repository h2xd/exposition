import type { Exposition } from '@exposition/core'
import type { DevtoolsContext } from '../@types/api'
import { timelineId } from '../utils/config'

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
