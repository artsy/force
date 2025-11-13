import { expect, test } from "@playwright/test"

test.describe("Search", () => {
  test("/search?:query", async ({ page }) => {
    await page.goto("/search?term=andy")
    await expect(page.locator("#root")).toContainText(
      "results for \u201Candy\u201D"
    )
    await expect(page).toHaveTitle("Search Results for 'andy' | Artsy")
  })
})
