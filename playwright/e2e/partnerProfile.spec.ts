import { expect, test } from "@playwright/test"

test.describe("partner/:partner_id", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("partner/gagosian")
  })

  test("renders metadata", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Gagosian | Artists, Art for Sale, and Contact Info | Artsy"
    )

    const metaDescription = page.locator("meta[name='description']")
    const content = await metaDescription.getAttribute("content")
    expect(content).toContain("Gagosian is a global gallery")
  })

  test("renders page content", async ({ page }) => {
    await expect(page.locator("h1").first()).toContainText("Gagosian")
  })

  test.skip("shows the list of shows", async ({ page }) => {
    await page.goto("partner/gagosian/shows")
    await expect(page.getByText("Past Events")).toBeVisible()
  })

  test("shows partner artists", async ({ page }) => {
    await page.goto("partner/gagosian/artists")
    await expect(page.getByText("Artists").first()).toBeVisible()
  })

  test("shows partner articles", async ({ page }) => {
    await page.goto("partner/gagosian/articles")
    await expect(page.getByText("Articles").first()).toBeVisible()
  })

  test.skip("does not show contact information for non-active partner", async ({
    page,
  }) => {
    // TODO: cy.visit(":partner_id/contact")
    await expect(
      page.getByText(
        "Sorry, the page you were looking for doesn&#x2019;t exist at this URL."
      )
    ).toBeVisible()
  })

  test("show contact information for active partner", async ({ page }) => {
    await page.goto("partner/gagosian/contact")
    await expect(page.getByText("New York").first()).toBeVisible()
    await expect(page.getByText("Locations")).toBeVisible()
  })
})
