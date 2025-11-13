import { expect, test } from "@playwright/test"

test.describe("Page", () => {
  test("/page/:id", async ({ page }) => {
    await page.goto("page/terms")

    await expect(page).toHaveTitle(/Terms/)
  })
})
