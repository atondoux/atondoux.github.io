import { expect, test, type Page } from '@playwright/test';

const SITE_ORIGIN = 'https://aurelientondoux.com';
const SHARE_IMAGE_URL = new RegExp(`^${SITE_ORIGIN}/_astro/og-default\\.[\\w-]+\\.jpg$`);
const JPEG_MAGIC_BYTES = Buffer.from([0xff, 0xd8, 0xff]);

const readShareImageUrl = async (page: Page): Promise<string> => {
  const ogImage = page.locator('head meta[property="og:image"]');
  await expect(ogImage).toHaveAttribute('content', SHARE_IMAGE_URL);
  return (await ogImage.getAttribute('content')) ?? '';
};

for (const lang of ['fr', 'en']) {
  test(`advertises the brand banner as the ${lang} share image`, async ({ page }) => {
    await page.goto(`/${lang}/`);

    await readShareImageUrl(page);

    await expect(page.locator('head meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
    await expect(page.locator('head meta[property="og:image:height"]')).toHaveAttribute('content', '626');
    await expect(page.locator('head meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  });

  test(`serves the ${lang} share image as a jpeg`, async ({ page, request }) => {
    await page.goto(`/${lang}/`);
    const shareImageUrl = await readShareImageUrl(page);

    const response = await request.get(new URL(shareImageUrl).pathname);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toMatch(/^image\/jpeg\b/);
    expect((await response.body()).subarray(0, JPEG_MAGIC_BYTES.length)).toEqual(JPEG_MAGIC_BYTES);
  });
}
