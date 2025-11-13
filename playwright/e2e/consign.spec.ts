import { expect, test } from "@playwright/test"

test.describe("Consign", () => {
  test.skip("/sell", async ({ page }) => {
    // pending until the redesign is no longer under a feature flag
    await page.goto("sell")
    await expect(page.locator("h1").first()).toContainText(
      "Sell art from your collection"
    )
    await expect(page).toHaveTitle(
      "Sell Artwork with Artsy | Art Consignment | Artsy"
    )
  })

  // TODO:- Provide helpers for feature flag usage in playwright
  // This test will fail whenever the reorder flag is enabled.
  test.skip("/sell/submission", async ({ page }) => {
    await page.goto("sell/submission")
    await expect(page.locator("h1").first()).toContainText(
      "Tell us about your artwork"
    )
    await expect(page).toHaveTitle(
      "Sell Art from Your Collection | Consignments | Artsy"
    )
  })
})
