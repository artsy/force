import { expect, test } from "@playwright/test"

test.describe("Fair", () => {
  test("/fair/:fair_id", async ({ page }) => {
    await page.goto("fair/expo-chicago-2019")

    await expect(page.locator("h1").first()).toContainText("EXPO CHICAGO 2019")
    await expect(page).toHaveTitle("EXPO CHICAGO 2019 | Artsy")
  })
})
