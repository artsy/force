import { expect, test } from "@playwright/test"

test.describe("user/shipping", () => {
  test.describe("unauthenticated", () => {
    test("redirects to the login page", async ({ page }) => {
      await page.goto("user/shipping")
      await expect(page.getByText("Sign up or log in")).toBeVisible()
    })
  })
})
