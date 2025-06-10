import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "React Component Media Query",
  description: "Add a developer friendly solution for container media queries",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Getting Started', link: '/documentation/getting-started' },
        ]
      },
      {
        text: 'Hooks',
        items: [
          { text: 'useMediaContainer', link: '/documentation/getting-started' },
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'ContainerMedia', link: '/documentation/getting-started' },
          { text: 'BatchContainerMedia', link: '/documentation/getting-started' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
