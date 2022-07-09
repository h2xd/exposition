export default {
  title: 'Exposition',
  description: 'Documentation for the exposition library',
  appearance: true,
  lang: 'en-US',
  ignoreDeadLinks: true,
  base: process.env.NODE_ENV === 'development' ? '/' : '/exposition/',
  lastUpdated: true,
  markdown: {
    // https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
    theme: 'one-dark-pro',
    lineNumbers: true,
  },
  themeConfig: {
    // nav: [
    //   { text: 'Guide', link: '/guide' },
    //   { text: 'Configs', link: '/configs' },
    //   { text: 'GitHub', link: 'https://github.com/h2xd/exposition' }
    // ],
    // https://vitepress.vuejs.org/guide/theme-nav.html#navigation-links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/h2xd/exposition' },
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
        text: '📦 Packages',
        collapsible: true,
        items: [
          { text: '@exposition/core', link: '/packages/core' },
          { text: '@exposition/web', link: '/packages/web' },
          { text: '@exposition/msw', link: '/packages/msw' },
          { text: '@exposition/vue-devtools', link: '/packages/vue-devtools' },
        ],
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
  },
}
