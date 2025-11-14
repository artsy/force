import { expect, test } from "@playwright/test"

test.describe("About", () => {
  test("renders page content", async ({ page }) => {
    await page.goto("/about")
    await expect(page.locator("h1").first()).toContainText(
      "Artsy is the Leading Global Online Art Marketplace",
    )
    await expect(page).toHaveTitle("About | Artsy")
  })
})
