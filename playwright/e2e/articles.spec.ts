import { test, expect } from "@playwright/test"

test.describe("Articles", () => {
  test.describe("Editorial", () => {
    test("/articles", async ({ page }) => {
      await page.goto("articles")
      await expect(page).toHaveTitle("Editorial | Artsy")
    })

    test("/editorial", async ({ page }) => {
      await page.goto("articles")
      await expect(page).toHaveTitle("Editorial | Artsy")
    })

    test("/magazine", async ({ page }) => {
      await page.goto("magazine")
      await expect(page).toHaveTitle("Editorial | Artsy")
    })

    test("/news", async ({ page }) => {
      await page.goto("news")
      await expect(page).toHaveTitle("News | Artsy")
    })

    test.describe("Editorial features", () => {
      test("/venice-biennale-2015", async ({ page }) => {
        await page.goto("venice-biennale-2015")
        await expect(page).toHaveTitle(
          "56th Venice Biennale | Artists, Artworks, and Contact Info | Artsy",
        )
      })
    })
  })

  test.describe("Team Blogs (channels)", () => {
    test("/channel/artsy-education", async ({ page }) => {
      await page.goto("channel/artsy-education")
      await expect(page).toHaveTitle("Artsy for Education | Artsy")
    })

    test("/channel/buying-with-artsy", async ({ page }) => {
      await page.goto("channel/buying-with-artsy")
      await expect(page).toHaveTitle("Buying with Artsy | Artsy")
    })

    test("/jobs", async ({ page }) => {
      await page.goto("jobs")
      await expect(page).toHaveTitle("Jobs | Artsy")
    })

    test("/channel/life-at-artsy", async ({ page }) => {
      await page.goto("channel/life-at-artsy")
      await expect(page).toHaveTitle("Life at Artsy | Artsy")
    })
  })
})
