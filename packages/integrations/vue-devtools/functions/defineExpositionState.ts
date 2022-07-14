import type { Exposition, ExpositionValues } from '@exposition/core'
import { getExpositionValues, resetExpositionValues, updateExpositionValues } from '@exposition/core'
import { readFromLocalStorage, writeToLocalStorage } from '@exposition/web'
import { storageLog } from '../utils/logs'
import { defineDevToolsSettings } from './defineDevToolsSettings'

const settings = defineDevToolsSettings()

export function defineExpositionState<T extends Exposition<any>>(exposition: T) {
  const state: T = exposition

  function loadFromStore() {
    const fromLocalStorage = readFromLocalStorage<T>()

    if (settings.isEnabled('autoLoadFromLocalStorage') && fromLocalStorage) {
      Object.assign(state, updateExpositionValues(state, fromLocalStorage))
      storageLog('loaded exposition values', JSON.stringify(getValues()))
    }
  }

  function writeToStore() {
    storageLog('store values to local storage', JSON.stringify(getValues()))
    writeToLocalStorage(state)
  }

  function saveToStore(force = false): void {
    if (force) {
      writeToStore()
      return
    }

    if (settings.isEnabled('autoLoadFromLocalStorage'))
      writeToStore()
  }

  function reset() {
    Object.assign(state, resetExpositionValues(state))
    saveToStore()
  }

  function update(newValues: Partial<ExpositionValues<T>>) {
    Object.assign(state, updateExpositionValues(state, newValues))
    saveToStore()
  }

  function getValues() {
    return getExpositionValues(state)
  }

  return {
    value: state,
    getValues,
    loadFromStore,
    saveToStore,
    reset,
    update,
  }
}
