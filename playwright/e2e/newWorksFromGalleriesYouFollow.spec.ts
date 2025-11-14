import { expect, test } from "@playwright/test"

test.describe("New Works from Galleries You Follow", () => {
  test("/new-works-from-galleries-you-follow", async ({ page }) => {
    await page.goto("new-works-from-galleries-you-follow")
    await expect(page.locator("h1").first()).toContainText(
      "New Works from Galleries You Follow",
    )
    await expect(page).toHaveTitle(
      "New Works from Galleries You Follow | Artsy",
    )
  })
})
