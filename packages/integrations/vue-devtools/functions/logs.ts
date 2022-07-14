import debug from 'debug'

export const log = debug('exposition:vue-devtools')
export const actionLog = log.extend('action')
export const storageLog = log.extend('storage')
