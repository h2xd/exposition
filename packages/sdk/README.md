# 🧰 @exposition/sdk 

<!-- This file will also be automatically included in the main documentation -->
<!-- ../../docs/src/packages/sdk.md -->

Utils of the [`@exposition`](https://h2xd.github.io/exposition/) library,
to create and update the state in a non-mutating way.

## Install

```sh
pnpm add -D @exposition/sdk
```

```sh
yarn add -D @exposition/sdk
```

```sh
npm install -D @exposition/sdk
```

## `createExpositionState`

Create an Exposition state with all necessary data. 🔮

- Cast the config `as const` to get full type support. _(as seen on line 8)_ ✨
- The first `options` item will be set as the `initialValue` of the `Scenario`

```ts{8}
import { createExpositionState } from '@exposition/sdk'

// ✨ Cast the input config `as const` to get full type support
const expositionState = createExpositionState({
  auth: {
    options: ['valid ✅', 'deny ❌']
  }
} as const)
```

[🔗 Source Code](https://github.com/h2xd/exposition/blob/main/packages/sdk/src/functions/createExpositionState.ts)

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

[🔗 Source Code](https://github.com/h2xd/exposition/blob/main/packages/sdk/src/functions/updateExpositionValues.ts)

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

[🔗 Source Code](https://github.com/h2xd/exposition/blob/main/packages/sdk/src/functions/getExpositionValues.ts)

## `getInitialExpositionValues`

Extract the initials values from a given `ExpositionState`. 🦖

```ts
const expositionState = createExpositionState({
  progress: {
    options: [
      '🐛 Small',
      '🦋 Big',
    ],
  },
})

const updatedExposition = updateExpositionValues(expositionState, { progress: '🦋 Big' })

getInitialExpositionValues(updatedExposition) // { progress: "🐛 Small" }
```

[🔗 Source Code](https://github.com/h2xd/exposition/blob/main/packages/sdk/src/functions/getInitialExpositionValues.ts)

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

[🔗 Source Code](https://github.com/h2xd/exposition/blob/main/packages/sdk/src/functions/resetExpositionValues.ts)
