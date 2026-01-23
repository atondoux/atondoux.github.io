import { test, expect } from '@playwright/test'

test.use({ locale: 'fr-FR' })

test.describe('Products Page', () => {
  test('displays products to visitor', async ({ page, baseURL }) => {
    // Start from home page
    await page.goto('/')

    // Navigate to products page via navigation menu
    const productsLink = page.getByTestId('nav-products')
    await expect(productsLink).toBeVisible()
    await expect(productsLink).toBeEnabled()
    await productsLink.click()

    // Display products to visitor
    await expect(page.getByRole('heading', { name: 'Mes créations.' })).toBeVisible()

    // CTA buttons: Book appointment and Malt profile
    const maltCTA = page.getByRole('link', { name: 'Mon profil Malt' })
    await expect(maltCTA).toBeVisible()
    await expect(maltCTA).toHaveAttribute('href', 'https://www.malt.fr/profile/aurelientondoux')
  })
})
