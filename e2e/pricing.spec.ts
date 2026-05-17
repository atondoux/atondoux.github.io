import { test, expect } from '@playwright/test'

test.use({ locale: 'fr-FR' })

test.describe('Pricing Page', () => {
  test('displays pricing plans to visitor', async ({ page }) => {
    // Start from home page
    await page.goto('/')

    // Navigate to pricing page via navigation menu
    const pricingLink = page.getByTestId('nav-pricing')
    await expect(pricingLink).toBeVisible()
    await expect(pricingLink).toBeEnabled()
    await pricingLink.click()

    // Display pricing plans to visitor
    await expect(page.getByRole('heading', { name: 'Tarifs.' })).toBeVisible()

    // Plan 1 - Tech Lead with price 600€
    const techLeadCard = page.getByTestId('pricing-plan-0')
    await expect(techLeadCard).toBeVisible()
    await expect(techLeadCard.getByText('Tech Lead')).toBeVisible()
    await expect(techLeadCard.getByText('600€')).toBeVisible()

    // Plan 2 - Développeur Full Stack with price 600€
    const fullStackCard = page.getByTestId('pricing-plan-1')
    await expect(fullStackCard).toBeVisible()
    await expect(fullStackCard.getByText('Développeur Full Stack')).toBeVisible()
    await expect(fullStackCard.getByText('600€')).toBeVisible()

    // Plan 3 - Applications & Conseils with price "Devis sur demande"
    const consultingCard = page.getByTestId('pricing-plan-2')
    await expect(consultingCard).toBeVisible()
    await expect(consultingCard.getByText('Applications & Conseils')).toBeVisible()
    await expect(consultingCard.getByText('Devis sur demande')).toBeVisible()

    // CTA buttons: Book appointment and Malt profile
    const maltCTA = page.getByRole('link', { name: 'Mon profil Malt' })
    await expect(maltCTA).toBeVisible()
    await expect(maltCTA).toHaveAttribute('href', 'https://www.malt.fr/profile/aurelientondoux')
  })
})
