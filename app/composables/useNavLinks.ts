import type { NavigationMenuItem } from '@nuxt/ui'

export function useNavLinks() {
  const { t } = useI18n()
  const localePath = useLocalePath()

  return computed<NavigationMenuItem[]>(() => [{
    label: t('nav.home'),
    icon: 'i-lucide-home',
    to: localePath('/')
  }, {
    label: t('nav.projects'),
    icon: 'i-lucide-folder',
    to: localePath('/projects')
  }, {
    label: t('nav.blog'),
    icon: 'i-lucide-file-text',
    to: localePath('/blog')
  }, {
    label: t('nav.speaking'),
    icon: 'i-lucide-mic',
    to: localePath('/speaking')
  }, {
    label: t('nav.about'),
    icon: 'i-lucide-user',
    to: localePath('/about')
  }])
}
