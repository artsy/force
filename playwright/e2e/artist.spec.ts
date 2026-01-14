import { test, expect } from "@playwright/test"

test.describe("/artist/:id", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/artist/pablo-picasso", {
      timeout: 30000,
    })
  })

  test("renders metadata", async ({ page }) => {
    await expect(page).toHaveTitle(
      /Pablo Picasso - Biography, Shows, Articles & More \| Artsy/,
    )

    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute(
      "content",
      /Explore Pablo Picasso\u2019s biography, achievements, artworks, auction results, and shows on Artsy\. Perhaps the most influential artist of the 20th century, Pablo Picasso/,
    )
  })

  test("renders page content", async ({ page }) => {
    await expect(page.locator("h1").first()).toContainText("Pablo Picasso")
    await expect(page.locator("h2").first()).toContainText("Spanish, 1881–1973")
  })
})
