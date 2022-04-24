import { Scenario } from '@exposition/core';

const scenarioUser: Scenario<'valid' | 'unreachable'> = {
  name: 'user:email',
  description: 'Handle how the current state of the user email should look like',
  initialValue: 'valid',
  options: [
    {
      label: 'User email is fully valid',
      value: 'valid'
    },
    {
      label: 'The email is unreachable',
      value: 'unreachable'
    }
  ]
}