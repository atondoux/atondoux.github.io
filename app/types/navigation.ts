import type { NavigationMenuItem as BaseNavigationMenuItem } from '@nuxt/ui'

export interface NavigationMenuItem extends BaseNavigationMenuItem {
  icon?: string  // Lucide icon name (e.g., 'i-lucide-house')
  testId?: string  // For E2E test selectors
}
