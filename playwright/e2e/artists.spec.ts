import { test, expect } from "@playwright/test"

test.describe("Artists", () => {
  test("/artists", async ({ page }) => {
    await page.goto("artists")
    await expect(page.locator("h1").first()).toContainText("Featured Artists")
    await expect(page).toHaveTitle(
      "Browse Artists on Artsy | Modern and Contemporary Artists",
    )
  })
})
