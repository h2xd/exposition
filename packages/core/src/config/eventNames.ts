export const EventNames = {
  AFTER_RESET: 'afterReset',
  AFTER_UPDATE: 'afterUpdate',
  INITIALIZED: 'initialized',
} as const

export type ExpositionEventNames = typeof EventNames[keyof typeof EventNames]
