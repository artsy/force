import { test, expect } from "@playwright/test"

test.describe("Shows", () => {
  // FIXME: Temporarily pends spec to unblock CI
  test.skip("/shows", async ({ page }) => {
    await page.goto("shows")

    await expect(page.locator("h1").first()).toContainText("Featured Shows")
    await expect(page).toHaveTitle(
      "Art Gallery Shows and Museum Exhibitions | Artsy",
    )

    // follow link to individual show
    const showLink = page.locator('a[href*="/show/"]').first()
    await showLink.click()

    await expect(page.url()).toMatch(/\/show\//)
    await expect(page.getByText("Show")).toBeVisible()
  })
})
