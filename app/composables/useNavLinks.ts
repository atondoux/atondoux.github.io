import type { NavigationMenuItem } from '~/types/navigation'

export function useNavLinks() {
  const { t } = useI18n()
  const localePath = useLocalePath()

  return computed<NavigationMenuItem[]>(() => [{
    label: t('nav.home'),
    to: localePath('/'),
    icon: 'i-lucide-house'
  }, {
    label: t('nav.services'),
    to: localePath('/services'),
    icon: 'i-lucide-hand-coins'
  }, {
    label: t('nav.projects'),
    to: localePath('/projects'),
    icon: 'i-lucide-folder-kanban'
  }, {
    label: t('nav.products'),
    to: localePath('/products'),
    icon: 'i-lucide-package'
  }, {
    label: t('nav.about'),
    to: localePath('/about'),
    icon: 'i-lucide-user-round'
  }])
}
