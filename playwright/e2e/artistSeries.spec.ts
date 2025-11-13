import { expect, test } from "@playwright/test"

test.describe("ArtistSeries", () => {
  test("/artist-series/:id", async ({ page }) => {
    await page.goto("artist-series/kaws-companions")
    await expect(page.locator("h1").first()).toContainText("Companions")
    await expect(page).toHaveTitle(/KAWS/)
  })
})
