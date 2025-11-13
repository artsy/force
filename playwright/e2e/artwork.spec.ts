import { expect, test } from "@playwright/test"

test.describe("/artwork/:id", () => {
  test("renders metadata", async ({ page }) => {
    await page.goto("/artwork/pablo-picasso-guernica")

    await expect(page).toHaveTitle(
      /Pablo Picasso \| Guernica \(1937\) \| Artsy/
    )

    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute(
      "content",
      "From Museo Reina Sofía, Pablo Picasso, Guernica (1937), Oil on canvas, 349.3 × 776.6 cm"
    )
  })

  test("renders page content", async ({ page }) => {
    await page.goto("/artwork/pablo-picasso-guernica")

    await expect(page.locator("h1").first()).toContainText("Guernica, 1937")
    await expect(page.getByText("Museo Reina Sofía").first()).toBeVisible()
  })

  test("renders a 404", async ({ page, request }) => {
    await page.goto("/artwork/pablo-picasso-guernica")

    const response = await request.get("/artwork/blahblahblah")
    expect(response.status()).toBe(404)

    await page.goto("/artwork/blahblahblah", { waitUntil: "domcontentloaded" })
  })
})
