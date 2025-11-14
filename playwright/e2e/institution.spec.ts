import { expect, test } from "@playwright/test"

test.describe("Institution", () => {
  test("/:institution_slug", async ({ page }) => {
    await page.goto("the-national-gallery-london")
    await expect(page.locator("h1").first()).toContainText(
      "The National Gallery, London",
    )
    await expect(page).toHaveTitle(
      "The National Gallery, London | Artists, Artworks, and Contact Info | Artsy",
    )
  })
})
