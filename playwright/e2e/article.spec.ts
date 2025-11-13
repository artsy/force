import { expect, test } from "@playwright/test"

test.describe("Article", () => {
  test.describe("Editorial", () => {
    test("/article/:id - layout standard", async ({ page }) => {
      await page.goto(
        "article/artsy-editorial-agnes-deness-manhattan-wheatfield-grown-poignant"
      )

      await expect(page.locator("h1").first()).toContainText(
        "Agnes Denes\u2019s Manhattan Wheatfield Has Only Grown More Poignant"
      )
      await expect(page).toHaveTitle(
        "Remembering Agnes Denes\u2019s Wheatfield in Manhattan | Artsy"
      )
    })

    test("/article/:id - layout feature", async ({ page }) => {
      await page.goto(
        "article/artsy-editorial-inside-library-holds-worlds-rarest-colors"
      )

      await expect(page.locator("h1").first()).toContainText(
        "Inside the Library That Holds the World\u2019s Rarest Colors"
      )
      await expect(page).toHaveTitle(
        "Inside the Forbes Collection, the Library That Holds the World\u2019s Rarest Colors | Artsy"
      )
    })

    test("/article/:id - layout feature in series", async ({ page }) => {
      await page.goto("series/artsy-vanguard/artsy-editors-getting-their-due")

      await expect(page.locator("h1").first()).toContainText(
        "Getting Their Due"
      )
      await expect(page).toHaveTitle(
        "10 Artists Finally Getting Their Due in 2018 | Artsy"
      )
    })

    test("/news/:id", async ({ page }) => {
      await page.goto(
        "news/artsy-editorial-whitney-museum-revealed-curators-2021-biennial"
      )

      await expect(page.locator("h1").first()).toContainText(
        "The Whitney Museum revealed the curators for its 2021 biennial."
      )
      await expect(page).toHaveTitle(
        "David Breslin and Adrienne Edwards Will Curate 2021 Whitney Biennial | Artsy"
      )
    })

    test("/series/:id", async ({ page }) => {
      await page.goto("series/artsy-vanguard-2019")

      await expect(page.locator("h1").first()).toContainText(
        "The Artsy Vanguard 2019"
      )
      await expect(page).toHaveTitle(
        "The Artsy Vanguard 2019: 50 Artists to Know Right Now | Artsy"
      )
    })

    test("/video/:id", async ({ page }) => {
      await page.goto("video/artsy-editors-future-art-carrie-mae-weems")

      await expect(page.locator("h1").first()).toContainText("Carrie Mae Weems")
      await expect(page).toHaveTitle(
        "Carrie Mae Weems on the Future of Art | Artsy"
      )
    })

    test.describe("Classic", () => {
      test("partner article", async ({ page }) => {
        await page.goto(
          "v_and_a/article/victoria-and-albert-museum-sky-arts-ignition-memory-palace-at-the"
        )

        await expect(page.locator("h1").first()).toContainText(
          '"Sky Arts Ignition: Memory Palace" at the V&A'
        )
        await expect(page).toHaveTitle(
          '"Sky Arts Ignition: Memory Palace" at the V&A | Artsy'
        )
      })

      // TODO: Unsure what causes the 'Promoted Content' component to actually display
      test.skip("Promoted content", async ({ page }) => {
        await page.goto(
          "article/artsy-opera-gallery-founder-gilles-dyan-on-running-11-galleries-worldwide"
        )

        await expect(page.locator("h1").first()).toHaveText(
          "Opera Gallery Founder Gilles Dyan on Running 11 Galleries Worldwide"
        )
        await expect(page).toHaveTitle(
          "Opera Gallery Founder Gilles Dyan on Running 11 Galleries Worldwide | Artsy"
        )
        await expect(page.locator("a").first()).toContainText(
          "Promoted Content"
        )
      })

      test("internal channel", async ({ page }) => {
        await page.goto(
          "article/ifpda-fine-art-print-fair-ifpda-fine-art-print-fair-announces-2019-exhibitor-list-dynamic-reboot"
        )

        await expect(page.locator("h1").first()).toContainText(
          "The IFPDA Fine Art Print Fair Announces 2019 Exhibitor List and Dynamic Reboot"
        )
        await expect(page).toHaveTitle(
          "The IFPDA Fine Art Print Fair Announces 2019 Exhibitor List and Dynamic Reboot | Artsy"
        )
      })
    })

    test.describe("Editorial features", () => {
      test.describe("Artsy Vanguard 2019", () => {
        test("/series/artsy-vanguard-2019", async ({ page }) => {
          await page.goto("series/artsy-vanguard-2019")

          await expect(page.locator("h1").first()).toContainText(
            "The Artsy Vanguard 2019"
          )
          await expect(page).toHaveTitle(
            "The Artsy Vanguard 2019: 50 Artists to Know Right Now | Artsy"
          )
        })

        test("/series/artsy-vanguard-2019/:slug", async ({ page }) => {
          await page.goto("series/artsy-vanguard-2019/15-artists-2019")

          await expect(page.locator("h1").first()).toContainText(
            "Getting Their Due"
          )
          await expect(page).toHaveTitle(
            "The Artsy Vanguard 2019: 15 Artists Getting Their Due | Artsy"
          )
        })
      })
    })
  })
})
