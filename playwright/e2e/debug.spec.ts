import { test, expect } from "@playwright/test"

test.describe("/debug/baseline", () => {
  test("renders a blank page", async ({ page }) => {
    await page.goto("/debug/baseline")
    await expect(page.getByText("Baseline")).toBeVisible()
  })
})

test.describe("/debug/feature-flags", () => {
  test("hydrates with the flag values the server rendered", async ({
    page,
  }) => {
    const firstRenderValues = async () => {
      return page.locator("[data-testid$='-first']").allTextContents()
    }

    // Block scripts so the first load shows the server's HTML as-is
    await page.route("**/*.js", route => route.abort())
    await page.goto("/debug/feature-flags")
    await expect(page.getByText("Feature flags")).toBeVisible()
    const serverValues = await firstRenderValues()
    expect(serverValues).toHaveLength(4)

    await page.unroute("**/*.js")
    await page.goto("/debug/feature-flags")
    await expect(page.locator("body[data-test='AppReady']")).toBeVisible()

    expect(await firstRenderValues()).toEqual(serverValues)
  })
})
