import { expect, test, type Page } from '@playwright/test';

const localizedMenus = [
  {
    lang: 'fr',
    path: '/fr/',
    labels: ['Accueil', 'À propos', 'Services', 'Tarifs', 'Contact'],
    sitemap: 'Plan du site',
    contactCta: 'Me contacter',
  },
  {
    lang: 'en',
    path: '/en/',
    labels: ['Home', 'About', 'Services', 'Pricing', 'Contact'],
    sitemap: 'Sitemap',
    contactCta: 'Contact me',
  },
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
const TABLET_VIEWPORT = { width: 768, height: 1024 };
const MAX_TAB_STOPS = 60;

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

for (const { lang, path, labels, sitemap, contactCta } of localizedMenus) {
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

  test(`reveals the platform tooltip of each social link on hover in the footer of ${path}`, async ({ page }) => {
    await page.goto(path);

    const footer = page.locator('footer');

    for (const { name } of socialLinks[lang]) {
      const link = footer.getByRole('link', { name, exact: true });
      const tooltip = link.locator('[aria-hidden="true"]', { hasText: name });
      await expect(tooltip).toHaveCount(1);
      await expect(tooltip).toHaveCSS('opacity', '0');

      await link.hover();

      await expect(tooltip).toHaveCSS('opacity', '1');
      await page.mouse.move(0, 0);
      await expect(tooltip).toHaveCSS('opacity', '0');
    }
  });

  test(`reveals the platform tooltip of each social link when tabbing through the footer of ${path}`, async ({
    page,
  }) => {
    await page.goto(path);

    const footer = page.locator('footer');
    const links = socialLinks[lang].map(({ name }) => ({
      name,
      link: footer.getByRole('link', { name, exact: true }),
    }));
    const [first] = links;
    for (let stop = 0; stop < MAX_TAB_STOPS; stop++) {
      if (await first!.link.evaluate((element) => element === document.activeElement)) break;
      await page.keyboard.press('Tab');
    }

    for (const { name, link } of links) {
      const tooltip = link.locator('[aria-hidden="true"]', { hasText: name });

      await expect(link).toBeFocused();
      await expect(tooltip).toHaveCSS('opacity', '1');
      await page.keyboard.press('Tab');
      await expect(tooltip).toHaveCSS('opacity', '0');
    }
  });

  for (const viewport of [MOBILE_VIEWPORT, TABLET_VIEWPORT]) {
    test(`keeps every social link tooltip inside a ${viewport.width}px viewport in the footer of ${path}`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto(path);

      const footer = page.locator('footer');

      for (const { name } of socialLinks[lang]) {
        const tooltip = footer
          .getByRole('link', { name, exact: true })
          .locator('[aria-hidden="true"]', { hasText: name });
        await tooltip.scrollIntoViewIfNeeded();
        const box = await tooltip.boundingBox();

        expect(box).not.toBeNull();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width);
      }
    });
  }

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

  test(`shows the ${contactCta} mail button right of the theme toggle in the header of ${path}`, async ({ page }) => {
    await page.goto(path);

    const button = page.locator('#header').getByRole('link', { name: contactCta });
    const themeToggle = page.locator('#header [data-aw-toggle-color-scheme]').first();

    await expect(button).toBeVisible();
    await expect(themeToggle).toBeVisible();
    await expect(button).toHaveAttribute('href', 'mailto:atondoux@gmail.com');
    const buttonBox = await button.boundingBox();
    const toggleBox = await themeToggle.boundingBox();
    expect(buttonBox!.x).toBeGreaterThanOrEqual(toggleBox!.x + toggleBox!.width);
  });

  test(`reveals the ${contactCta} button only once the mobile menu is open on ${path}`, async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await page.goto(path);
    const button = page.locator('#header').getByRole('link', { name: contactCta });

    await expect(button).toBeHidden();
    await page.locator('#header [data-aw-toggle-menu]').click();

    await expect(button).toBeVisible();
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
