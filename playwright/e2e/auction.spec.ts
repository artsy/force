import { expect, test } from "@playwright/test"

test.describe("Auction", () => {
  test("/auction/:id", async ({ page }) => {
    await page.goto("auction/shared-live-mocktion-k8s")

    await expect(page.locator("h1").first()).toContainText(
      "Shared Live Mocktion K8S",
    )
    await expect(page).toHaveTitle(/Shared Live Mocktion K8S \| Artsy/)

    // Default sort state; ensures grid loads
    await expect(page.getByText("Lot Number (asc.)")).toBeVisible()
  })

  test("/auction/:id with query params", async ({ page }) => {
    await page.goto("auction/shared-live-mocktion-k8s?foo=zaz&bar=baz")

    await expect(page.locator("h1").first()).toContainText(
      "Shared Live Mocktion K8S",
    )
    await expect(page).toHaveTitle(/Shared Live Mocktion K8S \| Artsy/)

    // Default sort state; ensures grid loads
    await expect(page.getByText("Lot Number (asc.)")).toBeVisible()
  })
})
