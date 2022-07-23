# 🌱 @exposition/core

<!-- This file will also be automatically included in the main documentation -->
<!-- ../../docs/src/packages/core.md -->

Create an [`@exposition`](https://h2xd.github.io/exposition/) and use [integrations](https://h2xd.github.io/exposition/packages/integrations.html) or build custom ones by listening to various events.
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

## Motivation

The goal of this project is to provide really good developer experience, when it comes to API mocking.
The reason is that API mocking with a large subset of different variations / results is really hard
and I saw a lot of project skipping tests because even thinking about the amount of work and the debugging
later on is insane. _Okay! Okay! I will stop. Here is a candy to calm down._ 🍬

**This library is written with the thought that devs never want to leave their IDE and love to fiddle around with code first. Therefore you can find a lot of examples and descriptions in TSDoc.**

## Create an exposition 📙

```ts
const exposition = new Exposition({
  stage: {
    options: ['🐛 Small', '🦋 Big']
  }
} as const)
```

### Config

The first parameter is a simple record that will define the Schema of your `Exposition`
instance. Feel free to name your keys that describes your `Scenario` in the best possible way.
Also the first index of the `options` array will be set as the `initialValue` of the `Scenario`.

### Options

You can overwrite the default settings of `Exposition` with the second parameter.

| setting        | description                                                                    | example                                                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `active`       | Signal all integrations that they should stop their actions                    | [`@exposition/integrations/msw`](https://h2xd.github.io/exposition/integrations/msw.html) will reset all handler if this option is set to `false`                                      |
| `restoreState` | Signal all integrations that they should prevent all state restoration handler | [`@exposition/integrations/vue-devtools`](https://h2xd.github.io/exposition/integrations/vue-devtools.html) will not interact with the `localStorage` if this option is set to `false` |


```ts
const exposition = new Exposition(
  {
    // ... your config
  },
  {
    settings: {
      active: false,
      restoreState: false,
    }
  }
)
```

## Interact with the state

You can use the following commands to interact with your defined `Scenario` elements:

| command         | type     | action                                                                 |
| --------------- | -------- | ---------------------------------------------------------------------- |
| `values`        | `getter` | return the current `Scenario` values                                   |
| `initialValues` | `getter` | similar to `values` but will return the initialValue of the `Scenario` |
| `update`        | `method` | update one or multiple of your `Scenario` values                       |
| `reset`         | `method` | reset one or multiple `Scenario` elements to their `initialValue`      |
| `init`          | `method` | signal all integrations that you are finished with your setup          |

There are also commands to read and change the state of the overall `Exposition` settings:

| command          | type     | action                                       |
| ---------------- | -------- | -------------------------------------------- |
| `settings`       | `getter` | get the currently set settings               |
| `updateSettings` | `method` | update one or multiple `Exposition` settings |



## Listen on events

You can write handler to react to the following events:

| event            | timing                                     | extras                   |
| ---------------- | ------------------------------------------ | ------------------------ |
| `reset`          | when the `reset` method is called          |                          |
| `update`         | when the `update` method is called         |                          |
| `initialized`    | when the `init` method is called           | will only be called once |
| `updateSettings` | when the `updateSettings` method is called |                          |

The event handler will also contain the current `Exposition.values` and `Exposition.settings`.

```ts
const exposition = new Exposition({
  stage: {
    options: ['🐛 Small', '🦋 Big']
  }
} as const)

exposition.on('update', (values, settings) => {
  console.log(values)
})

exposition.update({ stage: '🦋 Big' })

// will trigger the console.log
// console.log(values) -> { "stage": "🦋 Big" }
```

## Add an integration

Mock Service Worker is the primary integration and even the reason
for this library. Therefore I highly recommend to start with the [msw setup guide](https://h2xd.github.io/exposition/cookbook/setup-msw.html) first.

You can also create your own integration that levels on the above `on` events.

A guide how to write a custom integration will follow.

For now you can check out the implementation of [`msw`](https://github.com/h2xd/exposition/blob/main/packages/integrations/msw/functions/createMswIntegration.ts)