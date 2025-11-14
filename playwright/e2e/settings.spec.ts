import { expect, test } from "@playwright/test"

test.describe("settings", () => {
  test.describe("unauthenticated", () => {
    test.skip("redirects to the homepage", async ({ page }) => {
      await page.goto("settings", { timeout: 10000 })

      expect(page.url()).toMatch(/\/$/)
    })
  })
})
