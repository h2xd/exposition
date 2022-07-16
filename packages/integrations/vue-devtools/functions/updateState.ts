import type { Exposition } from '@exposition/core'
import type { DevtoolsContext } from '../@types/api'
import { inspectorId } from '../utils/config'
import { log } from '../utils/logs'
import { createTimelineEvent } from './createTimelineEvent'

export function updateState<T extends Exposition<any>>(context: DevtoolsContext<T>): void {
  const { state, api, settings, onUpdate } = context

  log('Updating values to: %s', JSON.stringify(state.getValues()))

  onUpdate(state.getValues(), settings.isEnabled('active'))

  api.sendInspectorState(inspectorId)
  api.sendInspectorTree(inspectorId)

  createTimelineEvent('update exposition', context)
}
