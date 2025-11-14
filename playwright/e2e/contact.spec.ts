import { test, expect } from "@playwright/test"

// TODO: Currently throws an error. Likely needs an additional ENV var.
test.describe("Contact", () => {
  test("/contact", async ({ page }) => {
    await page.goto("/contact")
    await expect(page.locator("h1").first()).toContainText("Contact Us")
    await expect(page).toHaveTitle("Contact Us | Artsy")
  })
})
