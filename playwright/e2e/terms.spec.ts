import { expect, test } from "@playwright/test"

test.describe("/terms", () => {
  test("renders a markdown page of terms and conditions", async ({ page }) => {
    await page.goto("/terms")
    await expect(
      page.getByText("These General Terms and Conditions of Sale")
    ).toBeVisible()
  })
})

test.describe("mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } }) // iPhone X dimensions

  test.describe("/terms", () => {
    test("renders a markdown page of terms and conditions", async ({
      page,
    }) => {
      await page.goto("/terms")
      await expect(
        page.getByText("These General Terms and Conditions of Sale")
      ).toBeVisible()
    })
  })
})
