import { version } from '../../package.json'

export const id = `@exposition/vue-devtools/${version}`

export const stateType = 'My Awesome Plugin state'
export const inspectorId = `${id}/inspector`
export const timelineId = `${id}/timeline`
export const expositionLabel = '📖 Exposition'

export const warningLabelSettings = {
  backgroundColor: 0xFBA02D,
  textColor: 0x000000,
}

export const localStorageSettingsKey = 'ExpositionVueDevtoolsSettings'
