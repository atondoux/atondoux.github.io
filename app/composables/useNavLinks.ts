import type { NavigationMenuItem } from '@nuxt/ui'

export function useNavLinks() {
  const { t } = useI18n()
  const localePath = useLocalePath()

  return computed<NavigationMenuItem[]>(() => [{
    label: t('nav.home'),
    to: localePath('/')
  }, {
    label: t('nav.services'),
    to: localePath('/services')
  }, {
    label: t('nav.projects'),
    to: localePath('/projects')
  }, {
    label: t('nav.products'),
    to: localePath('/products')
  }, {
    label: t('nav.about'),
    to: localePath('/about')
  }])
}
