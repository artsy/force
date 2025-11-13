import { expect, test } from "@playwright/test"

test.describe("Gallery", () => {
  test("/:gallery_slug", async ({ page }) => {
    await page.goto("gallery-m")

    await expect(page.locator("h1").first()).toContainText("GALLERY M")
    await expect(page).toHaveTitle(
      "GALLERY M | Artists, Art for Sale, and Contact Info | Artsy"
    )
  })
})
