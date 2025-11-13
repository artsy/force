import { expect, test } from "@playwright/test"

test.describe("Home", () => {
  test("/", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle("Artsy — Discover and Buy Fine Art")
  })
})
