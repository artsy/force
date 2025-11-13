import { expect, test } from "@playwright/test"

test.describe("Features", () => {
  test("/feature/the-artsy-vanguard-2020", async ({ page }) => {
    await page.goto("feature/the-artsy-vanguard-2020")
    await expect(page.locator("h1").first()).toContainText(
      "The Artsy Vanguard 2020"
    )
    await expect(page).toHaveTitle("The Artsy Vanguard 2020 | Artsy")
  })
})
