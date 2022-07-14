import type { Exposition, ExpositionValues } from '@exposition/core'
import { getExpositionValues, resetExpositionValues, updateExpositionValues } from '@exposition/core'
import { readFromLocalStorage, writeToLocalStorage } from '@exposition/web'
import { defineDevToolsSettings } from './settings'

const settings = defineDevToolsSettings()

export function defineExpositionState<T extends Exposition<any>>(exposition: T) {
  const state: T = exposition

  function loadFromStore() {
    const fromLocalStorage = readFromLocalStorage<T>()

    if (settings.value[1].value && fromLocalStorage)
      Object.assign(state, updateExpositionValues(state, fromLocalStorage))
  }

  function saveToStore(checkEnabledSettings = false) {
    if (!checkEnabledSettings) {
      writeToLocalStorage(state)

      return
    }

    if (settings.isEnabled('autoLoadFromLocalStorage'))
      writeToLocalStorage(state)
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
