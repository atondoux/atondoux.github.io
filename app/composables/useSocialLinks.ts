export const useSocialLinks = () => {
  const { locale } = useI18n()

  return computed(() => {
    if (locale.value === 'fr') {
      return [
        {
          icon: 'i-simple-icons-linkedin',
          to: 'https://www.linkedin.com/in/atondoux/',
          target: '_blank',
          'aria-label': 'LinkedIn'
        },
        {
          icon: 'i-simple-icons-github',
          to: 'https://github.com/atondoux/',
          target: '_blank',
          'aria-label': 'GitHub'
        }
      ]
    }

    // English (default)
    return [
      {
        icon: 'i-simple-icons-linkedin',
        to: 'https://www.linkedin.com/in/atondoux/?locale=en_US',
        target: '_blank',
        'aria-label': 'LinkedIn'
      },
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/atondoux/',
        target: '_blank',
        'aria-label': 'GitHub'
      }
    ]
  })
}
