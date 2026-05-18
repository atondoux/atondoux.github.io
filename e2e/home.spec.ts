import { test, expect } from '@playwright/test'
import { expectCTA } from './helpers/cta'

test.describe('Home Page (French)', () => {
  test.use({ locale: 'fr-FR' })

  test('displays key information to visitor', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', {
      name: 'Bonjour, je suis Aurélien Tondoux Ingénieur Logiciel Senior'
    })).toBeVisible()

    await expect(page.getByText(
      'Je développe des logiciels de qualité qui résolvent des problèmes concrets.'
    )).toBeVisible()

    await expect(page.getByRole('heading', { name: /a propos/i })).toBeVisible()
    await expect(page.getByText(/Avec plus de 15 ans d’expérience/i)).toBeVisible()

    await expect(page.getByRole('heading', { name: 'Expérience' })).toBeVisible()
    await expect(page.getByText('AT Code Lab')).toBeVisible()
    await expect(page.getByText('Softway Medical')).toBeVisible()
    await expect(page.getByText('Monde')).toBeVisible()
    await expect(page.getByText('ESN')).toBeVisible()
  })

  test('provides interactive elements for visitor actions', async ({ page }) => {
    await page.goto('/')

    await expectCTA(page, { type: 'booking', locale: 'fr' })

    const linkedInLink = page.getByRole('link', { name: /linkedin/i }).first()
    await expect(linkedInLink).toBeVisible()
    await expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/atondoux/')

    const maltLink = page.getByRole('link', { name: /malt/i }).first()
    await expect(maltLink).toBeVisible()
    await expect(maltLink).toHaveAttribute('href', 'https://www.malt.fr/profile/aurelientondoux')

    const gitHubLink = page.getByRole('link', { name: /github/i }).first()
    await expect(gitHubLink).toBeVisible()
    await expect(gitHubLink).toHaveAttribute('href', 'https://github.com/atondoux/')
  })

  test('provides navigation to other pages', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByTestId('nav-pricing')).toBeVisible()
    await expect(page.getByTestId('nav-pricing')).toBeEnabled()

    await expect(page.getByTestId('nav-portfolio')).toBeVisible()
    await expect(page.getByTestId('nav-portfolio')).toBeEnabled()

    await expect(page.getByTestId('nav-about')).toBeVisible()
    await expect(page.getByTestId('nav-about')).toBeEnabled()
  })

  test('provides language and theme switchers to visitor', async ({ page }) => {
    await page.goto('/')

    const languageSwitcher = page.getByRole('button', { name: /switch to english/i })
    await expect(languageSwitcher).toBeVisible()
    await expect(languageSwitcher).toBeEnabled()

    const themeSwitcher = page.getByRole('button', { name: /switch to (light|dark) mode/i })
    await expect(themeSwitcher).toBeVisible()
    await expect(themeSwitcher).toBeEnabled()
  })
})

test.describe('Home Page (English)', () => {
  test.use({ locale: 'en-US' })

  test('displays key information to visitor', async ({ page }) => {
    await page.goto('/en')

    // Identity: Name and title
    await expect(page.getByRole('heading', {
      name: 'Hey, I\'m Aurélien Tondoux Senior Software Engineer'
    })).toBeVisible()

    // Value proposition
    await expect(page.getByText(
      'I build quality software that solves real-world problems.'
    )).toBeVisible()

    // Quick introduction
    await expect(page.getByRole('heading', { name: /about me/i })).toBeVisible()
    await expect(page.getByText(/With over 15 years of experience/i)).toBeVisible()

    // Work experience overview
    await expect(page.getByRole('heading', { name: 'Work Experience' })).toBeVisible()
    await expect(page.getByText('AT Code Lab', { exact: true })).toBeVisible()
    await expect(page.getByText('Softway Medical', { exact: true })).toBeVisible()
    await expect(page.getByText('World', { exact: true })).toBeVisible()
    await expect(page.getByText('IT Services', { exact: true })).toBeVisible()
  })

  test('provides interactive elements for visitor actions', async ({ page }) => {
    await page.goto('/en')

    await expectCTA(page, { type: 'booking', locale: 'en' })

    const linkedInLink = page.getByRole('link', { name: /linkedin/i }).first()
    await expect(linkedInLink).toBeVisible()
    await expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/atondoux/?locale=en_US')

    const maltLink = page.getByRole('link', { name: /malt/i }).first()
    await expect(maltLink).toBeVisible()
    await expect(maltLink).toHaveAttribute('href', 'https://www.malt.com/profile/aurelientondoux')

    const gitHubLink = page.getByRole('link', { name: /github/i }).first()
    await expect(gitHubLink).toBeVisible()
    await expect(gitHubLink).toHaveAttribute('href', 'https://github.com/atondoux/')
  })

  test('provides navigation to other pages', async ({ page }) => {
    await page.goto('/en')

    await expect(page.getByTestId('nav-pricing')).toBeVisible()
    await expect(page.getByTestId('nav-pricing')).toBeEnabled()

    await expect(page.getByTestId('nav-portfolio')).toBeVisible()
    await expect(page.getByTestId('nav-portfolio')).toBeEnabled()

    await expect(page.getByTestId('nav-about')).toBeVisible()
    await expect(page.getByTestId('nav-about')).toBeEnabled()
  })

  test('provides language and theme switchers to visitor', async ({ page }) => {
    await page.goto('/en')

    const languageSwitcher = page.getByRole('button', { name: /switch to français/i })
    await expect(languageSwitcher).toBeVisible()
    await expect(languageSwitcher).toBeEnabled()

    const themeSwitcher = page.getByRole('button', { name: /switch to (light|dark) mode/i })
    await expect(themeSwitcher).toBeVisible()
    await expect(themeSwitcher).toBeEnabled()
  })
})
