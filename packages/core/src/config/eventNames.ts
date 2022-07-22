export const EventNames = {
  RESET: 'reset',
  UPDATE: 'update',
  UPDATE_SETTINGS: 'updateSettings',
  INITIALIZED: 'initialized',
} as const

export type ExpositionEventNames = typeof EventNames[keyof typeof EventNames]
