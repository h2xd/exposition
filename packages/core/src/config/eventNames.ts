export const EventNames = {
  RESET: 'reset',
  UPDATE: 'update',
  INITIALIZED: 'initialized',
} as const

export type ExpositionEventNames = typeof EventNames[keyof typeof EventNames]
