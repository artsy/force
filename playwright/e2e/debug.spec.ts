import { test, expect } from "@playwright/test"

test.describe("/debug/baseline", () => {
  test("renders a blank page", async ({ page }) => {
    await page.goto("/debug/baseline")
    await expect(page.getByText("Baseline")).toBeVisible()
  })
})
