import { test, expect } from '@playwright/test'
import { expectCTA } from './helpers/cta'

test.describe('Pricing Page (French)', () => {
  test.use({ locale: 'fr-FR' })

  test('displays pricing plans to visitor', async ({ page }) => {
    await page.goto('/')

    const pricingLink = page.getByTestId('nav-pricing')
    await expect(pricingLink).toBeVisible()
    await expect(pricingLink).toBeEnabled()
    await pricingLink.click()

    await expect(page.getByRole('heading', { name: 'Tarifs.' })).toBeVisible()

    await expectCTA(page, { type: 'booking', locale: 'fr' })
    await expectCTA(page, { type: 'malt', locale: 'fr' })

    const techLeadCard = page.getByTestId('pricing-plan-0')
    await expect(techLeadCard).toBeVisible()
    await expect(techLeadCard.getByText('Tech Lead')).toBeVisible()
    await expect(techLeadCard.getByText('600€')).toBeVisible()

    const fullStackCard = page.getByTestId('pricing-plan-1')
    await expect(fullStackCard).toBeVisible()
    await expect(fullStackCard.getByText('Développeur Full Stack')).toBeVisible()
    await expect(fullStackCard.getByText('600€')).toBeVisible()

    const consultingCard = page.getByTestId('pricing-plan-2')
    await expect(consultingCard).toBeVisible()
    await expect(consultingCard.getByText('Applications & Conseils')).toBeVisible()
    await expect(consultingCard.getByText('Devis sur demande')).toBeVisible()
  })
})

test.describe('Pricing Page (English)', () => {
  test.use({ locale: 'en-US' })

  test('displays pricing plans to visitor', async ({ page }) => {
    await page.goto('/en/pricing')

    await expect(page.getByRole('heading', { name: 'Pricing.' })).toBeVisible()

    await expectCTA(page, { type: 'booking', locale: 'en' })
    await expectCTA(page, { type: 'malt', locale: 'en' })

    const techLeadCard = page.getByTestId('pricing-plan-0')
    await expect(techLeadCard).toBeVisible()
    await expect(techLeadCard.getByText('Tech Lead')).toBeVisible()
    await expect(techLeadCard.getByText('€600')).toBeVisible()

    const fullStackCard = page.getByTestId('pricing-plan-1')
    await expect(fullStackCard).toBeVisible()
    await expect(fullStackCard.getByText('Full-Stack Developer')).toBeVisible()
    await expect(fullStackCard.getByText('€600')).toBeVisible()

    const consultingCard = page.getByTestId('pricing-plan-2')
    await expect(consultingCard).toBeVisible()
    await expect(consultingCard.getByText('Applications & Consulting')).toBeVisible()
    await expect(consultingCard.getByText('Quote on request')).toBeVisible()
  })
})
