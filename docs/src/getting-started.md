# Getting Started

:::warning ⚠️ This library is still in active development! 
I've just added the docs to get a better feeling for the
maximum amount of information that need to be put into TSDoc.
And start working on examples later on.
:::

## Install dependencies

Here are three commands for the most used package manager.<br>
_I'll be biased and promote my favorite one first._

`pnpm add -D exposition`

`yarn add -D exposition`

`npm install -D exposition`

## Define an exposition

Create an Exposition with all necessary data 🔮.

```ts
import { createExposition } from 'exposition'

// ✨ Cast the input config `as const` to get full type support
const exposition = createExposition({
  auth: {
    options: ['valid ✅', 'deny ❌']
  }
} as const)
```