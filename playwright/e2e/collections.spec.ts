import { expect, test } from "@playwright/test"

// context: https://artsy.slack.com/archives/C02BC3HEJ/p1662560324260439?thread_ts=1662541292.220899&cid=C02BC3HEJ
test.describe.skip("/collections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("collections", { timeout: 60000 })
  })

  test("renders metadata", async ({ page }) => {
    await expect(page).toHaveTitle("Collections | Artsy")

    const metaDescription = page.locator("meta[name='description']")
    await expect(metaDescription).toHaveAttribute(
      "content",
      "Discover collections of art curated by Artsy Specialists. From iconic artist series to trending design, shop collections on the world's largest online art marketplace."
    )
  })

  test("renders page header content", async ({ page }) => {
    await expect(page.locator("h1").first()).toContainText("Collections")
    await expect(page.getByText("View works")).toBeVisible()
  })

  test("renders collection categories", async ({ page }) => {
    await expect(
      page.locator("#collectible-sculptures").locator("..").locator("div")
    ).toContainText("Collectible Sculptures")

    await expect(
      page.locator("#abstract-art").locator("..").locator("div")
    ).toContainText("Abstract Art")

    await expect(
      page.locator("#genre").locator("..").locator("div")
    ).toContainText("Genre")
  })

  test("renders collection links", async ({ page }) => {
    await expect(page.getByText("Graffiti")).toBeVisible()
    await expect(page.getByText("Essential KAWS")).toBeVisible()
    await expect(page.getByText("Emerging Street Art")).toBeVisible()
  })
})
