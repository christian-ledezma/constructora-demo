import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("shows the hero and exactly two project cards", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { level: 1 }),
    ).toBeVisible();

    const projectSection = page.locator("#proyectos");
    await projectSection.scrollIntoViewIfNeeded();

    const cards = projectSection.getByRole("link");
    await expect(cards).toHaveCount(2);
    await expect(
      projectSection.getByRole("heading", { name: "Begonias de Aranjuez" }),
    ).toBeVisible();
    await expect(
      projectSection.getByRole("heading", { name: "Prados del Oeste" }),
    ).toBeVisible();
  });

  test("navigates to a project detail page from its card", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .locator("#proyectos")
      .getByRole("link")
      .filter({ hasText: "Begonias de Aranjuez" })
      .click();

    await expect(page).toHaveURL(/\/proyectos\/begonias-de-aranjuez/);
    await expect(
      page.getByRole("heading", { name: "Begonias de Aranjuez" }),
    ).toBeVisible();
  });

  test("footer contact anchor and project links work", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#contacto")).toBeAttached();
    await expect(
      page.getByRole("contentinfo").getByRole("link", {
        name: "Prados del Oeste",
      }),
    ).toHaveAttribute("href", "/proyectos/prados-del-oeste");
  });
});

test.describe("Mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens via the hamburger button and links to a section", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Abrir menú de navegación" }).click();
    const mobileNav = page.getByRole("button", {
      name: "Cerrar menú de navegación",
    });
    await expect(mobileNav).toBeVisible();

    await page.getByRole("link", { name: "Proyectos" }).last().click();
    await expect(page.locator("#proyectos")).toBeInViewport();
  });
});
