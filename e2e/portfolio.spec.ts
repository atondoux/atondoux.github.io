import { test, expect } from '@playwright/test'
import { expectCTA } from './helpers/cta'

const PROJECTS_TITLES = '[data-testid^="project-title-"]'

test.describe('Portfolio Page (French)', () => {
  test.use({ locale: 'fr-FR' })

  test('displays portfolio to visitor', async ({ page }) => {
    await page.goto('/')

    const portfolioLink = page.getByTestId('nav-portfolio')
    await expect(portfolioLink).toBeVisible()
    await expect(portfolioLink).toBeEnabled()
    await portfolioLink.click()

    await expect(page.getByRole('heading', { name: 'Portfolio.' })).toBeVisible()

    await expectCTA(page, { type: 'booking', locale: 'fr' })
    await expectCTA(page, { type: 'malt', locale: 'fr' })

    await expect(page.locator(PROJECTS_TITLES)).toHaveText([
      /^Malt$/,
      /^Namirial$/,
      /^Formation Spring Boot$/,
      /^Orange Business$/,
      /^Ortho Assistant$/,
      /^Softway Medical$/,
      /^Tour du monde$/,
      /^Société Générale$/,
      /^Natixis$/,
      /^SNCF Connect & Tech$/,
      /^Ministère de la Santé$/,
      /^Veolia Eau$/
    ])
  })
})

test.describe('Portfolio Page (English)', () => {
  test.use({ locale: 'en-US' })

  test('displays portfolio to visitor', async ({ page }) => {
    await page.goto('/en/portfolio')

    await expect(page.getByRole('heading', { name: 'Portfolio.' })).toBeVisible()

    await expectCTA(page, { type: 'booking', locale: 'en' })
    await expectCTA(page, { type: 'malt', locale: 'en' })

    await expect(page.locator(PROJECTS_TITLES)).toHaveText([
      /^Malt$/,
      /^Namirial$/,
      /^Spring Boot Online Course$/,
      /^Orange Business$/,
      /^Ortho Assistant$/,
      /^Softway Medical$/,
      /^World Tour$/,
      /^Societe Generale$/,
      /^Natixis$/,
      /^SNCF Connect & Tech$/,
      /^Ministry of Health$/,
      /^Veolia Water$/
    ])
  })
})
