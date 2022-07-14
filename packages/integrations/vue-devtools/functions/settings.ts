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

  type StateKey = Readonly<typeof state>[number]['key']

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

  function isEnabled(setting: StateKey): boolean {
    return state.some((stateItem) => {
      return stateItem.key === setting && stateItem.value
    })
  }

  main()

  return {
    value: state,
    saveSettings,
    loadSettings,
    isEnabled,
  }
}
