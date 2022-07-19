export const EventNames = {
  AFTER_UPDATE: 'afterUpdate',
  INITIALIZED: 'initialized',
} as const

export type ExpositionEventNames = typeof EventNames[keyof typeof EventNames]
