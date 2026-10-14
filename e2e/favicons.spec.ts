import { createHash } from 'node:crypto';
import { expect, test } from '@playwright/test';

const brandIcons = [
  {
    selector: 'link[rel="shortcut icon"]',
    file: 'favicon.ico',
    sha256: 'a8c08f8d3c40450c153447ee2f2a9b471d14a9cd42a89461c4a19bf30b081a67',
  },
  {
    selector: 'link[rel="icon"][sizes="32x32"]',
    file: 'favicon-32x32.png',
    sha256: 'f1282ddb1829225e7487cfaa29b7e7f87a3c2e099fb2704ac60281daa1b55323',
  },
  {
    selector: 'link[rel="icon"][sizes="16x16"]',
    file: 'favicon-16x16.png',
    sha256: '10163fcda69e80efe6173bf984c246b4de537ad8e97059335b35fbf60ca0bcbb',
  },
  {
    selector: 'link[rel="apple-touch-icon"]',
    file: 'apple-touch-icon.png',
    sha256: '545195b108d7eaa0358c356347dc0cdd9d9856f8f1c5a404cd9fb26ca09c3d8e',
  },
];

const sha256Of = (body: Buffer): string => createHash('sha256').update(body).digest('hex');

for (const { selector, file, sha256 } of brandIcons) {
  test(`serves the brand ${file}`, async ({ page, request }) => {
    await page.goto('/fr/');
    const link = page.locator(`head ${selector}`);
    await expect(link).toHaveAttribute('href', /.+/);
    const href = (await link.getAttribute('href')) ?? '';

    const response = await request.get(href);

    expect(response.status()).toBe(200);
    expect(sha256Of(await response.body())).toBe(sha256);
  });
}

test('serves the brand favicon at the conventional root url', async ({ request }) => {
  const response = await request.get('/favicon.ico');

  expect(response.status()).toBe(200);
  expect(sha256Of(await response.body())).toBe(brandIcons[0].sha256);
});

test('no longer advertises the template svg favicon', async ({ page }) => {
  await page.goto('/fr/');

  await expect(page.locator('head link[type="image/svg+xml"], head link[rel="mask-icon"]')).toHaveCount(0);
});
