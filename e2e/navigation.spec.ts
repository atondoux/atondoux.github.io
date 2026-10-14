import { expect, test, type Page } from '@playwright/test';

const localizedMenus = [
  { lang: 'fr', path: '/fr/', labels: ['Accueil', 'À propos', 'Services'], sitemap: 'Plan du site' },
  { lang: 'en', path: '/en/', labels: ['Home', 'About', 'Services'], sitemap: 'Sitemap' },
] as const;

const SECTION_IDS = ['about', 'services'] as const;
const MOBILE_VIEWPORT = { width: 390, height: 844 };

test.use({ reducedMotion: 'reduce' });

const headerNav = (page: Page) => page.locator('#header nav');

const expectSectionBelowHeader = async (page: Page, id: string) => {
  const section = page.locator(`#${id}`);
  const headerBox = await page.locator('#header').boundingBox();
  expect(headerBox).not.toBeNull();
  const headerBottom = headerBox!.y + headerBox!.height;

  await expect(section).toBeInViewport();
  await expect
    .poll(async () => (await section.boundingBox())?.y ?? Number.NEGATIVE_INFINITY)
    .toBeGreaterThanOrEqual(headerBottom - 1);
};

for (const { lang, path, labels, sitemap } of localizedMenus) {
  test(`lists the ${lang} section labels in order in the header of ${path}`, async ({ page }) => {
    await page.goto(path);

    const links = headerNav(page).getByRole('link');

    await expect(links).toHaveText([...labels]);
  });

  test(`scrolls to the about section when clicking ${labels[1]} on ${path}`, async ({ page }) => {
    await page.goto(path);

    await headerNav(page).getByRole('link', { name: labels[1] }).click();

    await expect(page).toHaveURL(`${path}#about`);
    await expectSectionBelowHeader(page, 'about');
  });

  test(`scrolls to the services section when clicking ${labels[2]} on ${path}`, async ({ page }) => {
    await page.goto(path);

    await headerNav(page).getByRole('link', { name: labels[2] }).click();

    await expect(page).toHaveURL(`${path}#services`);
    await expectSectionBelowHeader(page, 'services');
  });

  test(`shows the ${sitemap} column with the same links in the footer of ${path}`, async ({ page }) => {
    await page.goto(path);

    const footer = page.locator('footer');
    const headerHrefs = await headerNav(page)
      .getByRole('link')
      .evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute('href')));

    await expect(footer.getByText(sitemap, { exact: true })).toHaveCount(1);
    await expect(footer.getByText(sitemap, { exact: true })).toBeVisible();
    await expect(footer.getByRole('link', { name: labels[1], exact: true })).toHaveAttribute('href', headerHrefs[1]!);
    await expect(footer.getByRole('link', { name: labels[2], exact: true })).toHaveAttribute('href', headerHrefs[2]!);
  });

  test(`resolves every header hash link to an element of ${path}`, async ({ page }) => {
    await page.goto(path);

    const hashes = await headerNav(page)
      .getByRole('link')
      .evaluateAll((anchors) =>
        anchors.map((anchor) => new URL((anchor as HTMLAnchorElement).href).hash).filter(Boolean)
      );

    expect(hashes).toEqual(SECTION_IDS.map((id) => `#${id}`));
    for (const hash of hashes) {
      await expect(page.locator(hash)).toHaveCount(1);
    }
  });

  test(`closes the mobile menu after clicking ${labels[1]} on ${path}`, async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto(path);
    const toggle = page.locator('#header [data-aw-toggle-menu]');

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await headerNav(page).getByRole('link', { name: labels[1] }).click();

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(headerNav(page)).toBeHidden();
    await expectSectionBelowHeader(page, 'about');
  });
}

test('shows the french about section in view when loading /fr/#about directly', async ({ page }) => {
  await page.goto('/fr/#about');

  await expectSectionBelowHeader(page, 'about');
});
