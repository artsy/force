import { expect, test } from "@playwright/test"

test.describe("Viewing rooms", () => {
  test("/viewing-rooms", async ({ page }) => {
    await page.goto("viewing-rooms")
    await expect(page.locator("h1").first()).toContainText("Viewing Rooms")
    await expect(page).toHaveTitle("Artsy Viewing Rooms")

    // follow link to viewing room
    const roomLink = page.locator('a[href*="/viewing-room/"]').first()
    await roomLink.click()
    expect(page.url()).toContain("/viewing-room/")
    await expect(page.locator(':has-text("Works")').first()).toBeVisible()
  })
})
