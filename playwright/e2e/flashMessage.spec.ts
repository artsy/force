import { test, expect } from "@playwright/test"

// FIXME: These pass locally but not on CI
test.describe.skip("flash_message", () => {
  test("renders the email confirmed banner when ?flash_message is confirmed", async ({
    page,
  }) => {
    await page.goto("/?flash_message=confirmed")

    await expect(page.locator("[data-test='flashMessage']")).toContainText(
      "Your email has been confirmed",
    )
  })

  test("ignores flash messages that aren't explicitly supported", async ({
    page,
  }) => {
    await page.goto("/?flash_message=l33thaxor")

    await expect(page.locator("[data-test='flashMessage']")).not.toContainText(
      "l33thaxor",
    )
  })
})
