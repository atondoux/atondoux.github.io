export default defineAppConfig({
  global: {
    picture: {
      dark: '',
      light: '',
      alt: ''
    },
    meetingLink: 'https://calendly.com/atondoux/30min/',
    email: 'ui-pro@nuxt.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    },
    prose: {
      h2: {
        base: 'relative text-2xl text-highlighted font-semibold mt-12 mb-4 scroll-mt-[calc(48px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(48px+var(--ui-header-height))] [&>a]:focus-visible:outline-primary [&>a>code]:border-dashed hover:[&>a>code]:border-primary hover:[&>a>code]:text-primary [&>a>code]:text-xl/7 [&>a>code]:font-semibold [&>a>code]:transition-colors'
      },
      p: {
        base: 'mb-4 leading-7 text-pretty text-gray-700 dark:text-gray-300'
      },
      ul: {
        base: 'list-disc list-outside ml-6 space-y-2 mb-8 marker:text-(--ui-border-accented)'
      },
      li: {
        base: 'pl-2 leading-7 text-gray-700 dark:text-gray-300 [&>ul]:my-0'
      }
    }
  },
  footer: {
    colorMode: false
  }
})
