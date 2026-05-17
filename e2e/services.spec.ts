import { test, expect } from '@playwright/test'

const TITLES_SELECTOR = '[data-testid^="service-title-"]'

test.describe('Services Page', () => {
  test.use({ locale: 'fr-FR' })

  test('displays the services catalog to visitor', async ({ page }) => {
    await page.goto('/')

    const catalogLink = page.getByTestId('nav-services')
    await expect(catalogLink).toBeVisible()
    await expect(catalogLink).toBeEnabled()
    await catalogLink.click()

    await expect(page.getByRole('heading', { name: 'Catalogue de services.' })).toBeVisible()

    await expect(page.locator(TITLES_SELECTOR)).toHaveText([
      /^Leadership Technique$/,
      /^Développement Full-Stack$/,
      /^Bootstrap de Projets$/,
      /^Reprise de Projets Legacy$/,
      /^Audit & Revue de Code$/,
      /^DevOps & Cloud$/,
      /^Architecture$/
    ])

    // CTA buttons: Book appointment and Malt profile
    const maltCTA = page.getByRole('link', { name: 'Mon profil Malt' })
    await expect(maltCTA).toBeVisible()
    await expect(maltCTA).toHaveAttribute('href', 'https://www.malt.fr/profile/aurelientondoux')
  })
})

test.describe('Services Page (English)', () => {
  test.use({ locale: 'en-US' })

  test('displays the english catalog to visitor', async ({ page }) => {
    await page.goto('/en/services')

    await expect(page.getByRole('heading', { name: 'Services.' })).toBeVisible()

    await expect(page.locator(TITLES_SELECTOR)).toHaveText([
      /^Tech Leadership$/,
      /^Full-Stack Development$/,
      /^Project Bootstrapping$/,
      /^Legacy Project Recovery$/,
      /^Audit & Code Review$/,
      /^DevOps & Cloud$/,
      /^Architecture$/
    ])

    // CTA buttons: Book appointment and Malt profile
    const maltCTA = page.getByRole('link', { name: 'My Malt profile' })
    await expect(maltCTA).toBeVisible()
    await expect(maltCTA).toHaveAttribute('href', 'https://www.malt.com/profile/aurelientondoux')
  })
})
