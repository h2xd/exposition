# Getting Started

:::warning This library is in active development! ⚠️
Feel free to reach out if something seems weird, confusing or unnecessary complex.<br>
I'm willing to learn and welcome any kind of feedback with open arms. 🤗

[GitHub](https://github.com/h2xd/exposition) &bull; [Twitter](https://twitter.com/aschujkow)
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
import { Exposition } from '@exposition/core'

const exposition = new Exposition({
  auth: {
    options: ['valid ✅', 'deny ❌']
  }
} as const)
```

## Add an integration

Install [`@exposition/integrations`](https://h2xd.github.io/exposition/integrations/) and add it to your Exposition.

::: tip Start with msw 💡
Mock Service Worker is the primary integration and even the reason
for this library. Therefore I highly recommend to start with the [msw setup guide](./cookbook/setup-msw.md) first.
:::

<!-- @include: ./cookbook/snippets/next-guides.md -->