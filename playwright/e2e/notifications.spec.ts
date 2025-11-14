import { expect, test } from "@playwright/test"

test.describe("/notifications", () => {
  test.describe("unauthenticated", () => {
    test("redirects to the login page", async ({ page }) => {
      await page.goto("/notifications")

      await expect(page.getByText("Sign up or log in")).toBeVisible()
    })
  })
})
