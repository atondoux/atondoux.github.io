import { test, expect } from '@playwright/test'

test.use({ locale: 'fr-FR' })

test.describe('Projects Page', () => {
  test('displays projects to visitor', async ({ page, baseURL }) => {
    // Start from home page
    await page.goto('/')

    // Navigate to projects page via navigation menu
    const projectsLink = page.getByTestId('nav-projects')
    await expect(projectsLink).toBeVisible()
    await expect(projectsLink).toBeEnabled()
    await projectsLink.click()

    // Display projects to visitor
    await expect(page.getByRole('heading', { name: 'Mon parcours, mes expériences.' })).toBeVisible()

    // CTA buttons: Book appointment and Malt profile
    const maltCTA = page.getByRole('link', { name: 'Mon profil Malt' })
    await expect(maltCTA).toBeVisible()
    await expect(maltCTA).toHaveAttribute('href', 'https://www.malt.fr/profile/aurelientondoux')
  })
})
