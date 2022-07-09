# @exposition/core

<!-- This file will also be automatically included in the main documentation -->
<!-- ../../docs/src/packages/core.md -->

Main functionality of the [`@exposition`](https://github.com/h2xd/exposition) library,
to create and update the configuration while 
submitting events to various integrations.

```sh
pnpm add -D @exposition/core
```

## `createExposition`

Create an Exposition with all necessary data. 🔮

- Cast the config `as const` to get full type support. _(as seen on line 8)_ ✨
- The first `options` item will be set as the `initialValue` of the `Scenario`

```ts{8}
import { createExposition } from '@exposition/core'

// ✨ Cast the input config `as const` to get full type support
const exposition = createExposition({
  auth: {
    options: ['valid ✅', 'deny ❌']
  }
} as const)
```

[🔗 Source Code](https://github.com/h2xd/exposition/blob/main/packages/core/functions/createExposition.ts)

## `updateExpositionValues`

Update the values of the given `Exposition` and create a new `Exposition` state. 🆕

```ts
const exposition = createExposition({
  autobot: { options: ['Optimus Prime 🚚', 'Bumblebee 🚗'] },
  decepticon: { options: ['Megatron ✈️', 'Starscream 🛩️'] },
} as const)

const updatedExposition = updateExpositionValues(
  exposition,
  { autobot: 'Bumblebee 🚗' }
)

getExpositionValues(updatedExposition)
// { autobot: 'Bumblebee 🚗', decepticon: 'Megatron ✈️' }
```

[🔗 Source Code](https://github.com/h2xd/exposition/blob/main/packages/core/functions/updateExpositionValues.ts)

## `getExpositionValues`

Extract the current values from a given `Exposition`. 📃

```ts
const exposition = createExposition({
  base: {
    options: [
      '🍚 Rice - Cool',
      '🍝 Pasta - Mama Mia',
    ],
  },
})

getExpositionValues(exposition) // { base: "🍚 Rice - Cool" }
```

[🔗 Source Code](https://github.com/h2xd/exposition/blob/main/packages/core/functions/getExpositionValues.ts)

## `resetExpositionValues`

Reset the values of a given `Exposition` to their initialValue. ⏰

```ts
const exposition = createExposition({
  character: { options: ['Dio 🌎', 'JoJo 🌟'] },
} as const)

const updatedExposition = updateExpositionValues(
  exposition,
  { character: 'JoJo 🌟' }
)
getExpositionValues(updatedExposition) // { character: "JoJo 🌟" }

const revertedExposition = resetExpositionValues(updatedExposition)
getExpositionValues(revertedExposition) // { character: "Dio 🌎" }
```

[🔗 Source Code](https://github.com/h2xd/exposition/blob/main/packages/core/functions/resetExpositionValues.ts)
