import { test, expect } from "@playwright/test"

test.describe("About", () => {
  test("renders page content", async ({ page }) => {
    await page.goto("/about")
    await expect(page.locator("h1").first()).toContainText(
      "The Future of Art Collecting",
    )
    await expect(page).toHaveTitle("About | Artsy")
  })
})
