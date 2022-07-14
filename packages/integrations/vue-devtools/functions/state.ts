import type { Exposition, ExpositionValues } from '@exposition/core'
import { getExpositionValues, resetExpositionValues, updateExpositionValues } from '@exposition/core'
import { readFromLocalStorage, writeToLocalStorage } from '@exposition/web'
import { storageLog } from './logs'
import { defineDevToolsSettings } from './settings'

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

  function saveToStore(checkEnabledSettings = false) {
    function store() {
      storageLog('store values to local storage', JSON.stringify(getValues()))
      writeToLocalStorage(state)
    }

    if (!checkEnabledSettings) {
      store()

      return
    }

    if (settings.isEnabled('autoLoadFromLocalStorage'))
      store()
  }

  function reset() {
    Object.assign(state, resetExpositionValues(state))
  }

  function update(newValues: Partial<ExpositionValues<T>>) {
    Object.assign(state, updateExpositionValues(state, newValues))
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
