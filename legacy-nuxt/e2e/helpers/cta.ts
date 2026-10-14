import { expect, type Page } from '@playwright/test'

type CTAType = 'booking' | 'malt'
type Locale = 'fr' | 'en'

interface ExpectCTAOptions {
  type: CTAType
  locale: Locale
}

const CTA_CONFIG: Record<CTAType, Record<Locale, { name: string, href: string }>> = {
  booking: {
    fr: { name: 'Prendre un rendez-vous', href: 'https://calendly.com/atondoux/30min/' },
    en: { name: 'Book an appointment', href: 'https://calendly.com/atondoux/30min/' }
  },
  malt: {
    fr: { name: 'Mon profil Malt', href: 'https://www.malt.fr/profile/aurelientondoux' },
    en: { name: 'My Malt profile', href: 'https://www.malt.com/profile/aurelientondoux' }
  }
}

export async function expectCTA(page: Page, { type, locale }: ExpectCTAOptions): Promise<void> {
  const { name, href } = CTA_CONFIG[type][locale]
  const cta = page.getByRole('link', { name })
  await expect(cta).toBeVisible()
  await expect(cta).toHaveAttribute('href', href)
}
