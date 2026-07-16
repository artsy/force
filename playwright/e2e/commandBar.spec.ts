import { test, expect } from "@playwright/test"

test.describe("Command Bar", () => {
  test("opens with ⌘K and navigates to a destination", async ({ page }) => {
    await page.goto("/")

    await page.keyboard.press("Meta+k")

    const input = page.getByPlaceholder("Search destinations and actions…")
    await expect(input).toBeVisible()

    await input.fill("settings")
    await page.keyboard.press("Enter")

    await expect(page).toHaveURL(/\/settings/)
  })
})
