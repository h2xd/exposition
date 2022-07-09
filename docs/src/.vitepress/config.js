export default {
  title: 'Exposition',
  description: 'Documentation for the exposition library',
  appearance: true,
  lang: 'en-US',
  base: 'https://h2xd.github.io/exposition/',
  lastUpdated: true,
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
          { text: 'core', link: '/packages/core' },
          { text: 'web', link: '/packages/web' },
          { text: 'msw', link: '/packages/msw' },
          { text: 'vue-devtools', link: '/packages/vue-devtools' },
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
