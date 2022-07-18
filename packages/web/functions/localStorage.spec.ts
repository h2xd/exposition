/**
 * @vitest-environment happy-dom
 */
import { afterEach, describe, expect, it } from 'vitest'
import { createExpositionState, getExpositionValues } from '@exposition/core'
import { LOCAL_STORAGE_KEY, readFromLocalStorage, writeToLocalStorage } from './localStorage'

const exposition = createExpositionState({
  account: {
    options: ['valid', 'inactive'],
  },
} as const)

afterEach(() => window.localStorage.clear())

describe('localStorage utils', () => {
  describe('write data to the localStorage', () => {
    it('should store the given exposition', () => {
      writeToLocalStorage(exposition)

      expect(window.localStorage.getItem(LOCAL_STORAGE_KEY)).not.toBeNull()
    })

    it('should be able to store the data under a custom key', () => {
      writeToLocalStorage(exposition, 'cool_key_name')

      expect(window.localStorage.getItem(LOCAL_STORAGE_KEY)).toBeNull()
      expect(window.localStorage.getItem('cool_key_name')).not.toBeNull()
    })
  })

  describe('should read data from the localStorage', () => {
    it('should get stored items from the localStorage', () => {
      writeToLocalStorage(exposition)

      const storedValues = readFromLocalStorage()

      expect(storedValues).toMatchObject(getExpositionValues(exposition))
    })

    it('should get data from a custom key', () => {
      writeToLocalStorage(exposition, 'another_cool_key_name')

      const storedValues = readFromLocalStorage('another_cool_key_name')

      expect(storedValues).toMatchObject(getExpositionValues(exposition))
    })
  })
})
