import { expect, test } from "@playwright/test"

test.describe("/collect", () => {
  test("renders collect page content", async ({ page }) => {
    await page.goto("/collect")

    await expect(page).toHaveTitle("Collect | Artsy")

    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute(
      "content",
      "Find artworks by subject matter, style/technique, movement, price, and gallery/institution."
    )

    await expect(page.locator("h1").first()).toContainText(
      "Collect art and design online"
    )
  })

  test("renders medium-specific content", async ({ page }) => {
    await page.goto("/collect/painting")

    await expect(page).toHaveTitle("Paintings - For Sale on Artsy")
    await expect(page.locator("h1").first()).toContainText(
      "Collect paintings online"
    )
  })
})
