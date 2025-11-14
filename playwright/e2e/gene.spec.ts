import { expect, test } from "@playwright/test"

test.describe("Gene", () => {
  test("/gene/:id", async ({ page }) => {
    await page.goto("gene/contemporary-figurative-painting")

    await expect(page.locator("h1").first()).toContainText(
      "Contemporary Figurative Painting",
    )
    await expect(page).toHaveTitle("Contemporary Figurative Painting | Artsy")
  })
})
