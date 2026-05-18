import { test, expect } from '@playwright/test'
import { expectCTA } from './helpers/cta'

const SERVICES_TITLES = '[data-testid^="service-title-"]'

test.describe('Services Page (French)', () => {
  test.use({ locale: 'fr-FR' })

  test('displays the services catalog to visitor', async ({ page }) => {
    await page.goto('/')

    const servicesLink = page.getByTestId('nav-services')
    await expect(servicesLink).toBeVisible()
    await expect(servicesLink).toBeEnabled()
    await servicesLink.click()

    await expect(page.getByRole('heading', { name: 'Catalogue de services.' })).toBeVisible()

    await expectCTA(page, { type: 'booking', locale: 'fr' })
    await expectCTA(page, { type: 'malt', locale: 'fr' })

    await expect(page.locator(SERVICES_TITLES)).toHaveText([
      /^Leadership Technique$/,
      /^Développement Full-Stack$/,
      /^Bootstrap de Projets$/,
      /^Reprise de Projets Legacy$/,
      /^Audit & Revue de Code$/,
      /^DevOps & Cloud$/,
      /^Architecture$/
    ])
  })
})

test.describe('Services Page (English)', () => {
  test.use({ locale: 'en-US' })

  test('displays the english catalog to visitor', async ({ page }) => {
    await page.goto('/en/services')

    await expect(page.getByRole('heading', { name: 'Services.' })).toBeVisible()

    await expectCTA(page, { type: 'booking', locale: 'en' })
    await expectCTA(page, { type: 'malt', locale: 'en' })

    await expect(page.locator(SERVICES_TITLES)).toHaveText([
      /^Tech Leadership$/,
      /^Full-Stack Development$/,
      /^Project Bootstrapping$/,
      /^Legacy Project Recovery$/,
      /^Audit & Code Review$/,
      /^DevOps & Cloud$/,
      /^Architecture$/
    ])
  })
})
