import type { Exposition } from '@exposition/core'
import type { DevtoolsContext } from '../@types/api'
import { expositionLabel, timelineId } from '../config'

export function createTimelineViews<T extends Exposition<any>>({ api }: DevtoolsContext<T>) {
  api.addTimelineLayer({
    id: timelineId,
    label: expositionLabel,
    color: 0x6004DB,
  })
}
