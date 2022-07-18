# 🌱 @exposition/core

<!-- This file will also be automatically included in the main documentation -->
<!-- ../../docs/src/packages/core.md -->

Main functionality of the [`@exposition`](https://h2xd.github.io/exposition/) library,
to create and update the configuration while 
submitting events to various [integrations](https://h2xd.github.io/exposition/packages/integrations.html).

## Install

```sh
pnpm add -D @exposition/core
```

```sh
yarn add -D @exposition/core
```

```sh
npm install -D @exposition/core
```

## `createExpositionState`

Create an Exposition state with all necessary data. 🔮

- Cast the config `as const` to get full type support. _(as seen on line 8)_ ✨
- The first `options` item will be set as the `initialValue` of the `Scenario`

```ts{8}
import { createExpositionState } from '@exposition/core'

// ✨ Cast the input config `as const` to get full type support
const expositionState = createExpositionState({
  auth: {
    options: ['valid ✅', 'deny ❌']
  }
} as const)
```

[🔗 Source Code](https://github.com/h2xd/exposition/blob/main/packages/core/src/sdk/createExpositionState.ts)

## `updateExpositionValues`

Update the values of the given `ExpositionState` and create a new `ExpositionState` state. 🆕

```ts
const expositionState = createExpositionState({
  autobot: { options: ['Optimus Prime 🚚', 'Bumblebee 🚗'] },
  decepticon: { options: ['Megatron ✈️', 'Starscream 🛩️'] },
} as const)

const updatedExposition = updateExpositionValues(
  expositionState,
  { autobot: 'Bumblebee 🚗' }
)

getExpositionValues(updatedExposition)
// { autobot: 'Bumblebee 🚗', decepticon: 'Megatron ✈️' }
```

[🔗 Source Code](https://github.com/h2xd/exposition/blob/main/packages/core/src/sdk/updateExpositionValues.ts)

## `getExpositionValues`

Extract the current values from a given `ExpositionState`. 📃

```ts
const expositionState = createExpositionState({
  base: {
    options: [
      '🍚 Rice - Cool',
      '🍝 Pasta - Mama Mia',
    ],
  },
})

getExpositionValues(expositionState) // { base: "🍚 Rice - Cool" }
```

[🔗 Source Code](https://github.com/h2xd/exposition/blob/main/packages/core/src/sdk/getExpositionValues.ts)

## `resetExpositionValues`

Reset the values of a given `ExpositionState` to their initialValue. ⏰

```ts
const expositionState = createExpositionState({
  character: { options: ['Dio 🌎', 'JoJo 🌟'] },
} as const)

const updatedExposition = updateExpositionValues(
  expositionState,
  { character: 'JoJo 🌟' }
)
getExpositionValues(updatedExposition) // { character: "JoJo 🌟" }

const revertedExposition = resetExpositionValues(updatedExposition)
getExpositionValues(revertedExposition) // { character: "Dio 🌎" }
```

[🔗 Source Code](https://github.com/h2xd/exposition/blob/main/packages/core/src/sdk/resetExpositionValues.ts)
