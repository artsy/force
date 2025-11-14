import { expect, test } from "@playwright/test"

test.describe("Fairs", () => {
  test("/fairs", async ({ page }) => {
    await page.goto("art-fairs")
    await expect(page.getByText("Past Events")).toBeVisible()
    await expect(page).toHaveTitle("Preview 60+ Top Art Fairs on Artsy | Artsy")
  })
})
