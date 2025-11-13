import { expect, test } from "@playwright/test"

test.describe("Institutions", () => {
  test("/institutions", async ({ page }) => {
    await page.goto("institutions")
    await expect(page.locator("h1").first()).toContainText(
      "Browse Museums and Institutions"
    )
    await expect(page).toHaveTitle("Institutions | Artsy")
  })

  test("/institution-partnerships", async ({ page }) => {
    await page.goto("institution-partnerships")
    await expect(page.locator("h1").first()).toContainText("Artsy for Museums")
    await expect(page).toHaveTitle("Institution Partnerships | Artsy")
  })
})
