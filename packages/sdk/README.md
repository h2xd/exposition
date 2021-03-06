# đ§° @exposition/sdk 

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

Create an Exposition state with all necessary data. đŽ

- Cast the config `as const` to get full type support. _(as seen on line 8)_ â¨
- The first `options` item will be set as the `initialValue` of the `Scenario`

```ts{8}
import { createExpositionState } from '@exposition/sdk'

// â¨ Cast the input config `as const` to get full type support
const expositionState = createExpositionState({
  auth: {
    options: ['valid â', 'deny â']
  }
} as const)
```

[đ Source Code](https://github.com/h2xd/exposition/blob/main/packages/sdk/src/functions/createExpositionState.ts)

## `updateExpositionValues`

Update the values of the given `ExpositionState` and create a new `ExpositionState` state. đ

```ts
const expositionState = createExpositionState({
  autobot: { options: ['Optimus Prime đ', 'Bumblebee đ'] },
  decepticon: { options: ['Megatron âī¸', 'Starscream đŠī¸'] },
} as const)

const updatedExposition = updateExpositionValues(
  expositionState,
  { autobot: 'Bumblebee đ' }
)

getExpositionValues(updatedExposition)
// { autobot: 'Bumblebee đ', decepticon: 'Megatron âī¸' }
```

[đ Source Code](https://github.com/h2xd/exposition/blob/main/packages/sdk/src/functions/updateExpositionValues.ts)

## `getExpositionValues`

Extract the current values from a given `ExpositionState`. đ

```ts
const expositionState = createExpositionState({
  base: {
    options: [
      'đ Rice - Cool',
      'đ Pasta - Mama Mia',
    ],
  },
})

getExpositionValues(expositionState) // { base: "đ Rice - Cool" }
```

[đ Source Code](https://github.com/h2xd/exposition/blob/main/packages/sdk/src/functions/getExpositionValues.ts)

## `getInitialExpositionValues`

Extract the initials values from a given `ExpositionState`. đĻ

```ts
const expositionState = createExpositionState({
  progress: {
    options: [
      'đ Small',
      'đĻ Big',
    ],
  },
})

const updatedExposition = updateExpositionValues(expositionState, { progress: 'đĻ Big' })

getInitialExpositionValues(updatedExposition) // { progress: "đ Small" }
```

[đ Source Code](https://github.com/h2xd/exposition/blob/main/packages/sdk/src/functions/getInitialExpositionValues.ts)

## `resetExpositionValues`

Reset the values of a given `ExpositionState` to their initialValue. â°

```ts
const expositionState = createExpositionState({
  character: { options: ['Dio đ', 'JoJo đ'] },
} as const)

const updatedExposition = updateExpositionValues(
  expositionState,
  { character: 'JoJo đ' }
)
getExpositionValues(updatedExposition) // { character: "JoJo đ" }

const revertedExposition = resetExpositionValues(updatedExposition)
getExpositionValues(revertedExposition) // { character: "Dio đ" }
```

[đ Source Code](https://github.com/h2xd/exposition/blob/main/packages/sdk/src/functions/resetExpositionValues.ts)
