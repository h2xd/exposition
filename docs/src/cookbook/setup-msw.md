# Setup Mock Service Worker Integration

Hey and welcome. In this guide I will show you how to setup the msw integration for exposition and include it into your application.

<!-- @include: ./snippets/feedback.md -->

## Install dependencies

For this example you need to install the following dependencies:
- [`@exposition/core`](https://h2xd.github.io/exposition/packages/core.html)
- [`@exposition/integrations`](https://h2xd.github.io/exposition/packages/integrations.html)
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

## Setup

First create an `Exposition` configuration.

<<< @/cookbook/examples/01-setup-msw.ts#create-exposition{3}

Setup a client that will be passed the the integration.
In this case it is service worker but you can also use [`setupServer`](https://mswjs.io/docs/api/setup-server).

<<< @/cookbook/examples/01-setup-msw.ts#setup-msw

Pass the `Exposition` configuration and your msw client to the integration.

<<< @/cookbook/examples/01-setup-msw.ts#setup-msw-integration{3-4}

## Define handler

Now comes the spicy part. 🌶️<br>
You can import the integration and add new handler by calling `createHandler`.

The cool part is that the `expositionValues` will automatically be available and are fully typed.

<<< @/cookbook/examples/01-setup-msw.ts#define-msw-handler{5}

::: tip Tip :bulb:
You can also use the very good [`@mswjs/data`](https://github.com/mswjs/data) library,<br>
In combination with [`@faker-js/faker`](https://fakerjs.dev/). :crown:
:::

## Include into your app

Final part - initialize both msw and integration in your app.

<<< @/cookbook/examples/01-setup-msw.ts#start-integration

## Next steps

Checkout the [Vue-Devtools](./../integrations/vue-devtools.md) integration it you want to swap values on the fly.

:::warning Incoming change 👢
The whole setup will also most likely change in the next iteration.<br>
Since the whole setup feels clunky. So keep your eyes on [issue #14](https://github.com/h2xd/exposition/issues/14).
:::

<!-- @include: ./snippets/next-guides.md -->