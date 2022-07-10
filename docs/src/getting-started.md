# Getting Started

:::warning This library is still in active development! ⚠️
I've just added the docs to get a better feeling for the
maximum amount of information that need to be put into TSDoc.
And start working on examples later on.
:::

## Install dependencies

Here are three commands for the most used package managers.<br>
_I'll be biased and promote my favorite one first._

```sh
pnpm add -D @exposition/core
```

```sh
yarn add -D @exposition/core
```

```sh
npm install -D @exposition/core
```

## Define an exposition

Create an Exposition with all necessary data 🔮

```ts
import { createExposition } from 'exposition'

const exposition = createExposition({
  auth: {
    options: ['valid ✅', 'deny ❌']
  }
} as const)
```

## Add an integration

::: tip Start with msw 💡
Mock Service Worker is the primary integration and even the reason
for this library. Therefore I highly recommend to start with the [msw setup guide](./cookbook/setup-msw.md) first.
:::

<!-- @include: ./cookbook/snippets/next-guides.md -->