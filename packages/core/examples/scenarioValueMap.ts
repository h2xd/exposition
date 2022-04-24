import { Scenario, ScenarioValueMap } from '..'

const UserScenario: Scenario<'gdi' | 'nod'> = {
  initialValue: 'gdi',
  name: 'user',
  options: [
    {
      value: 'gdi',
    },
    {
      value: 'nod'
    }
  ]
}

const config = {
  user: UserScenario
}

const ConfigValueMap: ScenarioValueMap<typeof config> = {
  user: 'gdi'
}