/* eslint-disable jest/expect-expect */
import { test, expect } from "@playwright/test"

test("/institution-partnerships", async ({ page }) => {
  await page.goto("institution-partnerships")
  await expect(page.locator("h1").first()).toContainText("Artsy for Museums")
  await expect(page).toHaveTitle("Institution Partnerships | Artsy")
})
