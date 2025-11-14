import { test, expect } from "@playwright/test"

test.describe("News", () => {
  test("renders the page", async ({ page }) => {
    await page.goto("news")
    await expect(page).toHaveTitle("News | Artsy")
  })
})
