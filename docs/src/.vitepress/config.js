export default {
  title: 'Exposition',
  description: 'Documentation for the exposition library',
  appearance: true,
  lang: 'en-US',
  base: process.env.NODE_ENV === 'development' ? '/' : '/exposition/',
  lastUpdated: true,
  markdown: {
    // https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
    theme: 'one-dark-pro',
    lineNumbers: false,
  },
  themeConfig: {
    logo: '/assets/exposition-logo.svg',
    nav: [
      { text: 'Guide', link: '/getting-started' },
      {
        text: 'Packages',
        items: generatePackages(),
        activeMatch: '/packages/',
      },
      {
        text: 'Integrations',
        items: generateIntegrations(),
        activeMatch: '/integrations/',
      },
    ],
    // https://vitepress.vuejs.org/guide/theme-nav.html#navigation-links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/h2xd/exposition' },
      { icon: 'twitter', link: 'https://twitter.com/aschujkow' },
    ],
    // https://vitepress.vuejs.org/guide/theme-sidebar.html#sidebar
    sidebar: [
      {
        text: '📖 Guide',
        items: [
          // { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
        ],
      },
      {
        text: '👨‍🍳 Cookbook',
        collapsible: true,
        items: [
          { text: 'Setup Mock Service Worker', link: '/cookbook/setup-msw' },
        ],
      },
      {
        text: '📦 Packages',
        collapsible: false,
        items: generatePackages(),
      },
      {
        text: '🧩 Integrations',
        collapsible: false,
        items: generateIntegrations(),
      },
    ],
    editLink: {
      pattern: 'https://github.com/h2xd/exposition/edit/main/docs/src/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright © 2022-present Andreas Schujkow',
    },
    algolia: {
      appId: 'KR7ASGX4FZ',
      apiKey: '3cdcae5f0f44cf283230c5cbc05fbb09',
      indexName: 'exposition',
    },
  },
}

function generatePackages() {
  return [
    { text: '@exposition/core', link: '/packages/core' },
    { text: '@exposition/integrations', link: '/packages/integrations' },
  ]
}

function generateIntegrations() {
  return [
    { text: 'msw', link: '/integrations/msw' },
    { text: 'vue-devtools', link: '/integrations/vue-devtools' },
  ]
}
