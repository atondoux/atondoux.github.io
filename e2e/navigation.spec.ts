import { expect, test, type Page } from '@playwright/test';

const localizedMenus = [
  {
    lang: 'fr',
    path: '/fr/',
    labels: ['Accueil', 'À propos', 'Services', 'Tarifs', 'Contact'],
    sitemap: 'Plan du site',
  },
  { lang: 'en', path: '/en/', labels: ['Home', 'About', 'Services', 'Pricing', 'Contact'], sitemap: 'Sitemap' },
] as const;

const socialLinks = {
  fr: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/atondoux/' },
    { name: 'Malt', href: 'https://www.malt.fr/profile/aurelientondoux' },
    { name: 'GitHub', href: 'https://github.com/atondoux/' },
  ],
  en: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/atondoux/?locale=en_US' },
    { name: 'Malt', href: 'https://www.malt.com/profile/aurelientondoux' },
    { name: 'GitHub', href: 'https://github.com/atondoux/' },
  ],
} as const;

const SECTION_IDS = ['about', 'services', 'pricing', 'contact'] as const;
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

  test(`scrolls to the pricing section when clicking ${labels[3]} on ${path}`, async ({ page }) => {
    await page.goto(path);

    await headerNav(page).getByRole('link', { name: labels[3] }).click();

    await expect(page).toHaveURL(`${path}#pricing`);
    await expectSectionBelowHeader(page, 'pricing');
  });

  test(`scrolls to the contact section when clicking ${labels[4]} on ${path}`, async ({ page }) => {
    await page.goto(path);

    await headerNav(page).getByRole('link', { name: labels[4] }).click();

    await expect(page).toHaveURL(`${path}#contact`);
    await expectSectionBelowHeader(page, 'contact');
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
    await expect(footer.getByRole('link', { name: labels[3], exact: true })).toHaveAttribute('href', headerHrefs[3]!);
    await expect(footer.getByRole('link', { name: labels[4], exact: true })).toHaveAttribute('href', headerHrefs[4]!);
  });

  test(`shows the social links opening in a new tab in the footer of ${path}`, async ({ page }) => {
    await page.goto(path);

    const footer = page.locator('footer');

    for (const { name, href } of socialLinks[lang]) {
      const link = footer.getByRole('link', { name, exact: true });
      await expect(link).toHaveAttribute('href', href);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      await expect(link.locator('svg')).toBeVisible();
    }
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

test('shows a decorative user-code icon next to the site name in the header logo', async ({ page }) => {
  await page.goto('/fr/');

  const logo = page.locator('#header a').filter({ hasText: 'AT Code Lab' });
  const icon = logo.locator('svg[data-icon="tabler:user-code"]');

  await expect(icon).toBeVisible();
  await expect(icon).toHaveAttribute('aria-hidden', 'true');
  await expect(logo).not.toContainText('🚀');
});
