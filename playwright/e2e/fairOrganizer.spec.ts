import { expect, test } from "@playwright/test"

test.describe("FairOrganizer", () => {
  test("/fair-organizer/:slug", async ({ page }) => {
    await page.goto("fair-organizer/art-paris")
    await expect(page.getByText("Art Paris").first()).toBeVisible()
    await expect(page).toHaveTitle(/Art Paris/)
  })

  test("/fair-organizer/:slug/articles", async ({ page }) => {
    await page.goto("fair-organizer/art-paris/articles")
    await expect(
      page.getByText("All Articles for Art Paris on Artsy").first(),
    ).toBeVisible()
    await expect(page).toHaveTitle("Art Paris | Artsy")
  })
})
