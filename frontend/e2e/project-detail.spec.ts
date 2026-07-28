import { test, expect } from "@playwright/test";

const projectsUnderTest = [
  { slug: "begonias-de-aranjuez", name: "Begonias de Aranjuez", photoCount: 8 },
  { slug: "prados-del-oeste", name: "Prados del Oeste", photoCount: 7 },
];

for (const { slug, name, photoCount } of projectsUnderTest) {
  test.describe(`Project page — ${name}`, () => {
    test("shows hero, facts, gallery mosaic and two 360 panoramas", async ({
      page,
    }) => {
      await page.goto(`/proyectos/${slug}`);

      await expect(page.getByRole("heading", { name, level: 1 })).toBeVisible();

      // Key facts section renders at least one fact pair
      await expect(page.locator("dl dt").first()).toBeVisible();

      // Gallery mosaic caps at 5 visible thumbnails regardless of the
      // project's actual photo count (7 or 8 here). Only one of the two
      // layouts (mobile lead photo vs. desktop mosaic) is ever exposed
      // to the accessibility tree at a time - `display: none` elements
      // are excluded from it entirely.
      const viewportWidth = page.viewportSize()?.width ?? 0;
      const isDesktopLayout = viewportWidth >= 640; // Tailwind's `sm` breakpoint
      const expectedThumbnails = isDesktopLayout ? Math.min(photoCount, 5) : 1;

      const thumbnails = page.getByRole("button", {
        name: new RegExp(`Ver foto \\d+ de ${name}`),
      });
      await expect(thumbnails).toHaveCount(expectedThumbnails);

      // The "view all" button always reports the true total, not just
      // what's visible in the mosaic.
      await expect(
        page.getByRole("button", { name: `Ver las ${photoCount} fotos` }),
      ).toBeVisible();

      // 360 tour: exactly two panorama viewers
      await expect(page.getByText("Tour 360°")).toBeVisible();
      await page.getByText("Tour 360°").scrollIntoViewIfNeeded();
      await expect(page.locator(".psv-container")).toHaveCount(2);
    });

    test("opens the lightbox from a gallery thumbnail and can browse past the visible 5", async ({
      page,
    }) => {
      await page.goto(`/proyectos/${slug}`);

      await page
        .getByRole("button", { name: new RegExp(`Ver foto 1 de ${name}`) })
        .first()
        .click();
      await expect(page.locator(".yarl__container")).toBeVisible();

      // The lightbox carries every photo, not just the 5 shown in the
      // mosaic - the counter should report the full total.
      await expect(page.getByText(`1 / ${photoCount}`)).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(page.locator(".yarl__container")).toBeHidden();
    });

    test("the 'view all photos' button opens the lightbox too", async ({
      page,
    }) => {
      await page.goto(`/proyectos/${slug}`);
      await page
        .getByRole("button", { name: `Ver las ${photoCount} fotos` })
        .click();
      await expect(page.locator(".yarl__container")).toBeVisible();
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
