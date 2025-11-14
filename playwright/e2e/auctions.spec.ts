import { test, expect } from "@playwright/test"

test.describe("Auctions", () => {
  test("/auctions", async ({ page }) => {
    await page.goto("auctions")
    await expect(page.locator("h1").first()).toContainText("Auctions")
    await expect(page).toHaveTitle(
      "Auctions on Artsy | Premium Artworks from In-Demand Artists",
    )
  })
})
