# Setup Mock Service Worker Integration

Hey and welcome. In this guide I will show you how to setup the msw integration for exposition and include it into your application.

<!-- @include: ./snippets/feedback.md -->

## Install dependencies

For this example you need to install the following dependencies:
- [`@exposition/core`](../packages/core.md)
- [`@exposition/integrations`](../packages/integrations.md)
- [`msw`](https://github.com/mswjs/msw)

```sh
pnpm add -D @exposition/{core,integrations} msw
```

```sh
yarn add -D @exposition/{core,integrations} msw
```

```sh
npm install -D @exposition/{core,integrations} msw
```

## tl;dr setup ⚡

I'm like to fiddle around with code first, so a whole example to copy & paste is just nice.<br>
Go ahead and grab the entire code from this cookbook and start building your mocks.

::: details _Example code_ 🍝
<<< @/../../examples/msw/01-setup-msw.ts
:::

Otherwise, if you wanna have a break down and a little bit of context follow the steps below.

## Create `Exposition`

First create an `Exposition` instance by passing in your configuration.

<<< @/../../examples/msw/01-setup-msw.ts#create-exposition{3}

Next, use `createMswIntegration` and add as a setting parameter ether [`setupClient`](https://mswjs.io/docs/api/setup-client) or [`setupServer`](https://mswjs.io/docs/api/setup-server).
In this case we use [`setupServer`](https://mswjs.io/docs/api/setup-server).

<<< @/../../examples/msw/01-setup-msw.ts#setup-msw-integration{2-3}

:::warning Weirdness alert 🌌
For now the `<typeof exampleExposition>` is legit and important.<br>
I'm searching in my head how to auto pass the config type to all extensions.
:::

## Define handler

You can import the integration and add new handler by calling `createHandler`.
The spicy part is that the first parameter `expositionValues` will automatically be fully typed.
With that you can use a [switch statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) and your cases will be auto suggested. 🌶️

<<< @/../../examples/msw/01-setup-msw.ts#define-msw-handler{5}

::: tip Pro gamer tip 👑
You can also use the very good [`@mswjs/data`](https://github.com/mswjs/data) library, in combination with [`@faker-js/faker`](https://fakerjs.dev/)
to build and fill your mocks. A cookbook for that will follow in the future.

:::details Check out this playground example
<<< @/../../playground/src/utils/mocks/database.ts
:::

## Finish 🏁

Initialize your exposition instance and test it in your app.

<<< @/../../examples/msw/01-setup-msw.ts#init-exposition

## Next steps

Checkout the [Vue-Devtools](./../integrations/vue-devtools.md) integration it you want to swap values on the fly
or reach out if you wanna have a small session.

<!-- @include: ./snippets/next-guides.md -->