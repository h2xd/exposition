import type { Exposition, ExpositionValues } from '@exposition/core'
import { getExpositionValues } from '@exposition/core'

export const LOCAL_STORAGE_KEY = 'exposition'

/**
 * Write a given exposition state to the local storage
 * @public
 * @param exposition - from which the values will be extracted
 * @param key - custom keyname for the store name
 *
 * @example
 * const exposition = createExposition(\{
 *  auth: {
 *    options: ['valid ✅', 'deny ❌']
 *   }
 * } as const)
 *
 * writeToLocalStorage(exposition)
 */
export function writeToLocalStorage<T extends Exposition<any>>(exposition: T, key = LOCAL_STORAGE_KEY): void {
  if (!window.localStorage)
    return

  const value = getExpositionValues(exposition)

  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * Read from the `localStorage` and extract the given `ExpositionValues`
 * @public
 * @param key - custom keyname for the store name
 * @returns the stored `ExpositionValues`
 *
 * @example
  let exposition = createExposition({
    auth: {
      options: ['valid ✅', 'deny ❌']
    }
  } as const)

  const storedValues = readFromLocalStorage() // { auth: 'deny ❌' }

  exposition = updateExpositionValues(exposition, storedValues)
 */
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
