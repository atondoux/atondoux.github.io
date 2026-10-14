import { expect, test } from '@playwright/test';

const SITE_URL = 'https://aurelientondoux.com';

const localizedHomes = [
  { lang: 'fr', path: '/fr/', ogLocale: 'fr_FR' },
  { lang: 'en', path: '/en/', ogLocale: 'en_US' },
] as const;

test('redirects the site root to the french home page', async ({ page }) => {
  await page.goto('/');

  await page.waitForURL('**/fr/');

  expect(new URL(page.url()).pathname).toBe('/fr/');
});

for (const { lang, path, ogLocale } of localizedHomes) {
  test(`declares ${lang} as the language of ${path}`, async ({ page }) => {
    await page.goto(path);

    const htmlLang = page.locator('html');

    await expect(htmlLang).toHaveAttribute('lang', lang);
  });

  test(`declares ${ogLocale} as the open graph locale of ${path}`, async ({ page }) => {
    await page.goto(path);

    const locale = page.locator('meta[property="og:locale"]');

    await expect(locale).toHaveAttribute('content', ogLocale);
  });

  test(`shows no template demo content on ${path}`, async ({ page }) => {
    await page.goto(path);

    const html = (await page.content()).toLowerCase();

    expect(html).not.toContain('astrowind');
    expect(html).not.toContain('astro v7');
    expect(html).not.toContain('unsplash');
  });

  test(`points the canonical url of ${path} to itself`, async ({ page }) => {
    await page.goto(path);

    const canonical = page.locator('link[rel="canonical"]');

    await expect(canonical).toHaveAttribute('href', `${SITE_URL}${path}`);
  });

  test(`links ${path} to every locale with x-default on french`, async ({ page }) => {
    await page.goto(path);

    const alternates = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((links) => links.map((link) => [link.getAttribute('hreflang'), link.getAttribute('href')]));

    expect(alternates).toEqual([
      ['fr', `${SITE_URL}/fr/`],
      ['en', `${SITE_URL}/en/`],
      ['x-default', `${SITE_URL}/fr/`],
    ]);
  });
}

test('keeps the site root out of search results while pointing to the french home page', async ({ request }) => {
  const response = await request.get('/');

  const html = await response.text();

  expect(html).toContain('url=/fr/');
  expect(html).toMatch(/<meta[^>]+name="robots"[^>]+content="noindex"|<meta[^>]+content="noindex"[^>]+name="robots"/);
  expect(html).toContain(`href="${SITE_URL}/fr/" rel="canonical"`);
});

test('excludes the site root from the sitemap', async ({ request }) => {
  const index = await (await request.get('/sitemap-index.xml')).text();
  const [, sitemapUrl] = index.match(/<loc>([^<]+)<\/loc>/) ?? [];

  const sitemap = await (await request.get(new URL(sitemapUrl).pathname)).text();

  expect(sitemap).not.toContain(`<loc>${SITE_URL}/</loc>`);
});

test('serves a noindex french 404 page without canonical or alternates', async ({ page }) => {
  const response = await page.goto('/does-not-exist/');

  expect(response?.status()).toBe(404);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
});

test('lists both locales with their alternates in the sitemap', async ({ request }) => {
  const index = await (await request.get('/sitemap-index.xml')).text();
  const [, sitemapUrl] = index.match(/<loc>([^<]+)<\/loc>/) ?? [];

  const sitemap = await (await request.get(new URL(sitemapUrl).pathname)).text();

  expect(sitemap).toContain(`<loc>${SITE_URL}/fr/</loc>`);
  expect(sitemap).toContain(`<loc>${SITE_URL}/en/</loc>`);
  expect(sitemap).toContain(`<xhtml:link rel="alternate" hreflang="fr" href="${SITE_URL}/fr/"/>`);
  expect(sitemap).toContain(`<xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/"/>`);
});
