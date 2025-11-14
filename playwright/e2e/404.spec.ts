import { expect, test } from "@playwright/test"

test.describe("404", () => {
  test("renders 404 page", async ({ page }) => {
    const response = await page.goto("/oh-no-some-404")
    expect(response?.status()).not.toBe(200)

    await expect(page.getByTestId("error-page")).toContainText(
      "Sorry, the page you were looking for doesn",
    )
  })
})
