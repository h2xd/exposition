# Vue-Devtools

[`@exposition`](https://h2xd.github.io/exposition/) extension for the [Vue-Devtools](https://devtools.vuejs.org/).

## Why? 🤔

I love the Vue-Devtools and always enjoyed how nicely everything works together
while keeping a beautiful UX & UI. Therefore it's a must to have an extension in place.
I hope you enjoy this extension as much as I do.

## Installation

```sh
pnpm add -D @exposition/{core, integrations} @vue/devtools-api
```

```sh
yarn add -D @exposition/{core, integrations} @vue/devtools-api
```

```sh
npm install -D @exposition/{core, integrations} @vue/devtools-api
```

## tl;dr setup ⚡

Create a Vue instance, an `Exposition` and use `setupDevtools` in your application.

```ts
import { createApp } from 'vue'
import { Exposition } from '@exposition/core'
import { setupDevtools } from '@exposition/integrations/vue-devtools'

import YourApplication from './App.vue'

const appExposition = new Exposition({
  // ... custom configuration
})

const app = createApp(YourApplication)

app.use(setupDevtools, {
  exposition: appExposition,
})

appExposition.init()

app.mount('#app')
```