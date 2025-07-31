import { test, expect } from "@playwright/test"

test.describe("/sale/:id", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sale/featured-works-for-sale")
  })

  test("renders metadata", async ({ page }) => {
    await expect(page).toHaveTitle(/Featured works for sale | Artsy/)
  })

  test("renders page content", async ({ page }) => {
    await expect(page.locator("h1").first()).toContainText(
      "Featured works for sale",
    )
    expect(page.url()).toContain("/sale/")
  })
})
