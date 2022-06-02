import type { Exposition, ExpositionValues } from '@exposition/core'
import { getExpositionValues } from '@exposition/core'

export const LOCAL_STORAGE_KEY = 'exposition'

/**
 *
 * @param key
 * @param exposition
 * @returns
 */
export function writeToLocalStorage<T extends Exposition<any>>(exposition: T, key = LOCAL_STORAGE_KEY): void {
  if (!window.localStorage)
    return

  const value = getExpositionValues(exposition)

  window.localStorage.setItem(key, JSON.stringify(value))
}

export function readFromLocalStorage<T extends Exposition<any>>(key = LOCAL_STORAGE_KEY): ExpositionValues<T> | undefined {
  if (!window.localStorage)
    return

  const dataItem = window.localStorage.getItem(key)

  if (!dataItem)
    return

  try {
    return JSON.parse(dataItem) as ExpositionValues<T>
  }
  catch (error) {
    console.error(error)
  }
}
