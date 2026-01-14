export default defineAppConfig({
  global: {
    picture: {
      dark: '/hero.jpg',
      light: '/hero.jpg',
      alt: 'Aurélien Tondoux profile picture'
    },
    meetingLink: 'https://calendly.com/atondoux/30min/',
    email: 'ui-pro@nuxt.com',
    available: true
  },
  ui: {
    colors: {
      primary: 'emerald',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    },
  },
  footer: {
    colorMode: false
  }
})
