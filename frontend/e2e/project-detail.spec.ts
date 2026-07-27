import { test, expect } from "@playwright/test";

const slugs = [
  { slug: "begonias-de-aranjuez", name: "Begonias de Aranjuez" },
  { slug: "prados-del-oeste", name: "Prados del Oeste" },
];

for (const { slug, name } of slugs) {
  test.describe(`Project page — ${name}`, () => {
    test("shows hero, facts, gallery thumbnails and two 360 panoramas", async ({
      page,
    }) => {
      await page.goto(`/proyectos/${slug}`);

      await expect(page.getByRole("heading", { name, level: 1 })).toBeVisible();

      // Key facts section renders at least one fact pair
      await expect(page.locator("dl dt").first()).toBeVisible();

      // Gallery: exactly 5 thumbnails per the brief
      const thumbs = page.locator(".bernales-gallery-thumbs .swiper-slide");
      await expect(thumbs).toHaveCount(5);

      // 360 tour: exactly two panorama viewers
      await expect(page.getByText("Tour 360°")).toBeVisible();
      await page.getByText("Tour 360°").scrollIntoViewIfNeeded();
      await expect(page.locator(".psv-container")).toHaveCount(2);
    });

    test("opens the lightbox from the main gallery image", async ({
      page,
    }) => {
      await page.goto(`/proyectos/${slug}`);
      await page
        .locator(".bernales-gallery .swiper-slide-active button")
        .first()
        .click();

      await expect(page.locator(".yarl__container")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.locator(".yarl__container")).toBeHidden();
    });

    test("back link returns to the projects section", async ({ page }) => {
      await page.goto(`/proyectos/${slug}`);
      await page.getByRole("link", { name: "Volver a proyectos" }).click();
      await expect(page).toHaveURL(/\/#proyectos/);
    });
  });
}

test("an unknown project slug shows the 404 page", async ({ page }) => {
  const response = await page.goto("/proyectos/no-existe");
  expect(response?.status()).toBe(404);
  await expect(page.getByText("Esta página no existe")).toBeVisible();
});
