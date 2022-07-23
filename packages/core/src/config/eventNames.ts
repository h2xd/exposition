export const EventNames = {
  /**
   * test?
   */
  RESET: 'reset',
  UPDATE: 'update',
  UPDATE_SETTINGS: 'updateSettings',
  INITIALIZED: 'initialized',
} as const

export type ExpositionEventNames = typeof EventNames[keyof typeof EventNames]
