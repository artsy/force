import { expect, test } from "@playwright/test"

test.describe("Galleries", () => {
  test("/galleries", async ({ page }) => {
    await page.goto("galleries")
    await expect(page.locator("h1").first()).toContainText("Browse Galleries")
    await expect(page).toHaveTitle("Galleries | Artsy")
  })
})
