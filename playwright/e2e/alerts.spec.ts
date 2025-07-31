import { test, expect } from "@playwright/test"

test.describe("user/alerts", () => {
  test.describe("unauthenticated", () => {
    test("redirects to the login page", async ({ page }) => {
      await page.goto("user/alerts")
      await expect(page.getByText("Sign up or log in")).toBeVisible()
    })
  })
})
