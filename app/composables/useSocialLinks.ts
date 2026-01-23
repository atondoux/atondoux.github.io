export const useSocialLinks = () => {
  const { locale } = useI18n()

  return computed(() => {
    if (locale.value === 'fr') {
      return [
        {
          'icon': 'i-simple-icons-linkedin',
          'to': 'https://www.linkedin.com/in/atondoux/',
          'target': '_blank',
          'aria-label': 'LinkedIn'
        },
        {
          'icon': 'i-simple-icons-malt',
          'to': 'https://www.malt.fr/profile/aurelientondoux',
          'target': '_blank',
          'aria-label': 'Malt',
          'class': '[&>span]:scale-160'
        },
        {
          'icon': 'i-simple-icons-github',
          'to': 'https://github.com/atondoux/',
          'target': '_blank',
          'aria-label': 'GitHub'
        }
      ]
    }

    // English (default)
    // If unexpected locale, then a 404 page not found will show up
    return [
      {
        'icon': 'i-simple-icons-linkedin',
        'to': 'https://www.linkedin.com/in/atondoux/?locale=en_US',
        'target': '_blank',
        'aria-label': 'LinkedIn'
      },
      {
        'icon': 'i-simple-icons-malt',
        'to': 'https://www.malt.com/profile/aurelientondoux',
        'target': '_blank',
        'aria-label': 'Malt',
        'class': '[&>span]:scale-160'
      },
      {
        'icon': 'i-simple-icons-github',
        'to': 'https://github.com/atondoux/',
        'target': '_blank',
        'aria-label': 'GitHub'
      }
    ]
  })
}
