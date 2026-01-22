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
    label: t('nav.projects'),
    to: localePath('/projects'),
    icon: 'i-lucide-folder-kanban',
    testId: 'nav-projects'
  }, {
    label: t('nav.products'),
    to: localePath('/products'),
    icon: 'i-lucide-package',
    testId: 'nav-products'
  }, {
    label: t('nav.testimonials'),
    to: localePath('/testimonials'),
    icon: 'i-lucide-message-circle',
    testId: 'nav-testimonials'
  }, {
    label: t('nav.about'),
    to: localePath('/about'),
    icon: 'i-lucide-user-round',
    testId: 'nav-about'
  }])
}
