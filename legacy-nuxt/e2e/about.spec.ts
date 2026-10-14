import { test, expect } from '@playwright/test'
import { expectCTA } from './helpers/cta'

test.describe('About Page (French)', () => {
  test.use({ locale: 'fr-FR' })

  test('displays about information to visitor', async ({ page }) => {
    await page.goto('/')

    const aboutLink = page.getByTestId('nav-about')
    await expect(aboutLink).toBeVisible()
    await expect(aboutLink).toBeEnabled()
    await aboutLink.click()

    await expect(page.getByRole('heading', { name: 'A propos.' })).toBeVisible()

    const sections = [
      /Mon parcours$/,
      /Mon écosystème$/,
      /Ma façon de travailler$/,
      /Mon apprentissage continu$/,
      /Mon usage de l'IA$/,
      /Intéressé \? Discutons collaboration !$/
    ]
    for (const name of sections) {
      await expect(page.getByRole('heading', { level: 2, name })).toBeVisible()
    }

    await expectCTA(page, { type: 'booking', locale: 'fr' })
    await expectCTA(page, { type: 'malt', locale: 'fr' })
  })
})

test.describe('About Page (English)', () => {
  test.use({ locale: 'en-US' })

  test('displays about information to visitor', async ({ page }) => {
    await page.goto('/en/about')

    await expect(page.getByRole('heading', { name: 'About me.' })).toBeVisible()

    const sections = [
      /My journey$/,
      /My ecosystem$/,
      /The way I work$/,
      /My continuous learning$/,
      /My use of AI$/,
      /Interested\? Let's talk!$/
    ]
    for (const name of sections) {
      await expect(page.getByRole('heading', { level: 2, name })).toBeVisible()
    }

    await expectCTA(page, { type: 'booking', locale: 'en' })
    await expectCTA(page, { type: 'malt', locale: 'en' })
  })
})
