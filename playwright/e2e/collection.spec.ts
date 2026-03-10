import { test, expect } from "@playwright/test"

const artworkGridRenders = async (page: any) => {
  // Wait for network to be idle to ensure artwork data has loaded
  await page.waitForLoadState("networkidle")
  await expect(page.locator("div[data-test='artworkGrid']")).toHaveCount(1)
  const gridItems = page.locator("div[data-test='artworkGridItem']")
  expect(await gridItems.count()).toBeGreaterThanOrEqual(1)
}

test.describe("/collection/:id", () => {
  test("renders metadata and page content", async ({ page }) => {
    await page.goto("/collection/emerging-photographers")
    await expect(page).toHaveTitle("Emerging Photographers - For Sale on Artsy")

    const metaDescription = page.locator("meta[name='description']")
    await expect(metaDescription).toHaveAttribute(
      "content",
      "Buy, bid, and inquire on Emerging Photographers on Artsy. Today’s leading photographers are pushing the medium into new territories—experimenting with digital manipulation, unleashing the power of new macro lenses...",
    )

    await expect(page.locator("h1").first()).toContainText(
      "Emerging Photographers",
    )
    await artworkGridRenders(page)
  })
})

test.describe("/collection/:id (a collection hub)", () => {
  test("renders metadata and page content", async ({ page }) => {
    await page.goto("/collection/contemporary")
    await expect(page).toHaveTitle("Contemporary Art - For Sale on Artsy")

    const metaDescription = page.locator("meta[name='description']")
    await expect(metaDescription).toHaveAttribute(
      "content",
      "Buy, bid, and inquire on Contemporary Art on Artsy. Spanning from 1970 to the present day, the contemporary period of art history represents the most diverse and widely-collected era of artistic production. ...",
    )

    await expect(page.locator("h1").first()).toContainText("Contemporary")

    await page.waitForTimeout(1000)
    await artworkGridRenders(page)
  })
})

test.describe("redirection", () => {
  test("redirects selected collections to artist series", async ({ page }) => {
    await page.goto("/collection/albrecht-durer-engraving")
    expect(page.url()).toContain(
      "/artist-series/albrecht-durer-etchings-and-engravings",
    )

    await page.goto("/collection/zeng-fanzhi-mask-series")
    expect(page.url()).toContain(
      "/artist-series/zeng-fanzhi-ceng-fan-zhi-mask-series",
    )
  })
})
