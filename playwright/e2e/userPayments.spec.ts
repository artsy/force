import { expect, test } from "@playwright/test"

test.describe("user/payments", () => {
  test.describe("unauthenticated", () => {
    test("redirects to the login page", async ({ page }) => {
      await page.goto("user/payments")
      await expect(page.getByText("Sign up or log in")).toBeVisible()
    })
  })
})
