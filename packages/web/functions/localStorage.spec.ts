/**
 * @vitest-environment happy-dom
 */
import { afterEach, describe, expect, it } from 'vitest'
import { Exposition, createExpositionState, getExpositionValues } from '@exposition/core'
import { LOCAL_STORAGE_KEY, readFromLocalStorage, writeToLocalStorage } from './localStorage'

const config = {
  account: {
    options: ['valid', 'inactive'],
  },
} as const
const exposition = new Exposition(config)
const expositionState = createExpositionState(config)

afterEach(() => {
  exposition.updateSettings({ restoreState: true })
  window.localStorage.clear()
})

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

    it('should store data, if the exposition.settings.restoreState is set to false', () => {
      exposition.updateSettings({ restoreState: false })

      writeToLocalStorage(exposition)

      expect(window.localStorage.getItem(LOCAL_STORAGE_KEY)).toBeNull()
    })
  })

  describe('should read data from the localStorage', () => {
    it('should get stored items from the localStorage', () => {
      writeToLocalStorage(exposition)

      readFromLocalStorage(exposition)

      expect(exposition.values).toMatchObject(getExpositionValues(expositionState))
    })

    it('should get data from a custom key', () => {
      writeToLocalStorage(exposition, 'another_cool_key_name')
      readFromLocalStorage(exposition, 'another_cool_key_name')

      expect(exposition.values).toMatchObject(getExpositionValues(expositionState))
    })

    it('should get data, if the exposition.settings.restoreState is set to false', () => {
      exposition.updateSettings({ restoreState: false })

      exposition.update({ account: 'inactive' })
      writeToLocalStorage(exposition)

      exposition.reset()
      readFromLocalStorage(exposition)

      expect(exposition.values).toMatchObject({ account: 'valid' })
    })
  })
})
