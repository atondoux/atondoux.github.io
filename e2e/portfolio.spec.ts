import { test, expect } from '@playwright/test'

test.use({ locale: 'fr-FR' })

test.describe('Portfolio Page', () => {
  test('displays portfolio to visitor', async ({ page }) => {
    // Start from home page
    await page.goto('/')

    // Navigate to portfolio page via navigation menu
    const portfolioLink = page.getByTestId('nav-portfolio')
    await expect(portfolioLink).toBeVisible()
    await expect(portfolioLink).toBeEnabled()
    await portfolioLink.click()

    // Display portfolio to visitor
    await expect(page.getByRole('heading', { name: 'Portfolio.' })).toBeVisible()

    // CTA buttons: Book appointment and Malt profile
    const maltCTA = page.getByRole('link', { name: 'Mon profil Malt' })
    await expect(maltCTA).toBeVisible()
    await expect(maltCTA).toHaveAttribute('href', 'https://www.malt.fr/profile/aurelientondoux')
  })
})
