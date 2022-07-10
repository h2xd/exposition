# 🧩 @exposition/integrations

<!-- This file will also be automatically included in the main documentation -->
<!-- ../../docs/src/packages/integrations.md -->

Extensions for the [`@exposition`](https://h2xd.github.io/exposition/) library
that enhance the developer experience.

## Install

```sh
pnpm add -D @exposition/integrations
```

```sh
yarn add -D @exposition/integrations
```

```sh
npm install -D @exposition/integrations
```

## List of all integrations

Each integration has it's own documentation and examples section. 💖

- [@exposition/integrations/msw](https://h2xd.github.io/exposition/integrations/msw) — _integration for_ [msw](https://mswjs.io/)
- [@exposition/integrations/vue-devtools](https://h2xd.github.io/exposition/integrations/vue-devtools) — _extension for_ [Vue Devtools](https://devtools.vuejs.org/)

## Tree-shaking

For better tree-shaking result, import integrations from submodules, for example:

```ts
// 🙆‍♀️ Do
import { defineMSWIntegration } from '@exposition/integrations/msw'

// 🙅‍♂️ Do not
import { defineMSWIntegration } from '@exposition/integrations'
```

