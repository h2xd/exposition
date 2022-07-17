const localStorageKey = 'ExpositionVueDevtoolsSettings'

export function defineDevtoolsSettingsState() {
  const state = [
    {
      key: 'active',
      value: true,
      editable: true,
    },
    {
      key: 'autoLoadFromLocalStorage',
      value: true,
      editable: true,
    },
  ]

  type StateKey = typeof state[number]['key']

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
