const localStorageKey = 'ExpositionVueDevtoolsSettings'

export function defineDevToolsSettings() {
  const state = [
    {
      key: 'active',
      value: true,
      editable: true,
    }, {
      key: 'autoLoadFromLocalStorage',
      value: true,
      editable: true,
      hint: 'Enable that custom modifications will be stored and auto loaded from the localStorage',
    },
  ]

  function main() {
    loadSettings()
  }

  function saveSettings() {
    window.localStorage.setItem(localStorageKey, JSON.stringify(state))
  }

  function loadSettings() {
    const settingsFromLocalStorage = window.localStorage.getItem(localStorageKey)

    if (!settingsFromLocalStorage)
      return

    Object.assign(state, JSON.parse(settingsFromLocalStorage))
  }

  main()

  return {
    state,
    saveSettings,
    loadSettings,
  }
}
