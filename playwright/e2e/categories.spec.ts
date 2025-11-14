/* eslint-disable jest/expect-expect */
import { expect, test } from "@playwright/test"

test.describe("/categories", () => {
  test("renders page content", async ({ page }) => {
    await page.goto("categories")
    await expect(page.locator("h1").first()).toContainText(
      "The Art Genome Project",
    )
  })
})
