import type { NavigationMenuItem } from '~/types/navigation'

export function useNavLinks() {
  const { t } = useI18n()
  const localePath = useLocalePath()

  return computed<NavigationMenuItem[]>(() => [{
    label: t('nav.home'),
    to: localePath('/'),
    icon: 'i-lucide-house',
    testId: 'nav-home'
  }, {
    label: t('nav.services'),
    to: localePath('/services'),
    icon: 'i-lucide-hand-coins',
    testId: 'nav-services'
  }, {
    label: t('nav.portfolio'),
    to: localePath('/portfolio'),
    icon: 'i-lucide-folder-kanban',
    testId: 'nav-portfolio'
  }, {
    label: t('nav.about'),
    to: localePath('/about'),
    icon: 'i-lucide-user-round',
    testId: 'nav-about'
  }])
}
