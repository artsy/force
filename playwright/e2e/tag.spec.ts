import { test, expect } from "@playwright/test"

test.describe("Tag", () => {
  test("/tag/:id", async ({ page }) => {
    await page.goto("tag/orange")
    await expect(page.locator("h1").first()).toContainText("Orange")
    await expect(page).toHaveTitle("Orange | Artsy")
  })
})
