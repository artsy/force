/* eslint-disable jest/expect-expect */
import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Article", () => {
  describe("Editorial", () => {
    it("/article/:id - layout standard", () => {
      visitWithStatusRetries(
        "article/artsy-editorial-agnes-deness-manhattan-wheatfield-grown-poignant"
      )
      cy.get("h1").should(
        "contain",
        "Agnes Denes’s Manhattan Wheatfield Has Only Grown More Poignant"
      )
      cy.title().should(
        "eq",
        "Remembering Agnes Denes’s Wheatfield in Manhattan | Artsy"
      )
    })

    it("/article/:id - layout feature", () => {
      visitWithStatusRetries(
        "article/artsy-editorial-inside-library-holds-worlds-rarest-colors"
      )
      cy.get("h1").should(
        "contain",
        "Inside the Library That Holds the World’s Rarest Colors"
      )
      cy.title().should(
        "eq",
        "Inside the Forbes Collection, the Library That Holds the World’s Rarest Colors | Artsy"
      )
    })

    it("/article/:id - layout feature in series", () => {
      visitWithStatusRetries(
        "series/artsy-vanguard/artsy-editors-getting-their-due"
      )
      cy.get("h1").should("contain", "Getting Their Due")
      cy.title().should(
        "eq",
        "10 Artists Finally Getting Their Due in 2018 | Artsy"
      )
    })

    it("/news/:id", () => {
      visitWithStatusRetries(
        "news/artsy-editorial-whitney-museum-revealed-curators-2021-biennial"
      )
      cy.get("h1").should(
        "contain",
        "The Whitney Museum revealed the curators for its 2021 biennial."
      )
      cy.title().should(
        "eq",
        "David Breslin and Adrienne Edwards Will Curate 2021 Whitney Biennial | Artsy"
      )
    })

    it("/series/:id", () => {
      visitWithStatusRetries("series/artsy-vanguard-2019")
      cy.get("h1").should("contain", "The Artsy Vanguard 2019")
      cy.title().should(
        "eq",
        "The Artsy Vanguard 2019: 50 Artists to Know Right Now | Artsy"
      )
    })

    it("/video/:id", () => {
      visitWithStatusRetries("video/artsy-editors-future-art-carrie-mae-weems")
      cy.get("h1").should("contain", "Carrie Mae Weems")
      cy.title().should("eq", "Carrie Mae Weems on the Future of Art | Artsy")
    })

    describe("Classic", () => {
      it("partner article", () => {
        visitWithStatusRetries(
          "v_and_a/article/victoria-and-albert-museum-sky-arts-ignition-memory-palace-at-the"
        )
        cy.get("h1").should(
          "contain",
          '"Sky Arts Ignition: Memory Palace" at the V&A'
        )
        cy.title().should(
          "eq",
          '"Sky Arts Ignition: Memory Palace" at the V&A | Artsy'
        )
      })

      // TODO: Unsure what causes the 'Promoted Content' component to actually display
      it.skip("Promoted content", () => {
        visitWithStatusRetries(
          "article/artsy-opera-gallery-founder-gilles-dyan-on-running-11-galleries-worldwide"
        )
        cy.get("h1").should(
          "eq",
          "Opera Gallery Founder Gilles Dyan on Running 11 Galleries Worldwide"
        )
        cy.title().should(
          "eq",
          "Opera Gallery Founder Gilles Dyan on Running 11 Galleries Worldwide | Artsy"
        )
        cy.get("a").should("contain", "Promoted Content")
      })

      it("internal channel", () => {
        visitWithStatusRetries(
          "article/ifpda-fine-art-print-fair-ifpda-fine-art-print-fair-announces-2019-exhibitor-list-dynamic-reboot"
        )
        cy.get("h1").should(
          "contain",
          "The IFPDA Fine Art Print Fair Announces 2019 Exhibitor List and Dynamic Reboot"
        )
        cy.title().should(
          "eq",
          "The IFPDA Fine Art Print Fair Announces 2019 Exhibitor List and Dynamic Reboot | Artsy"
        )
      })
    })

    describe("Editorial features", () => {
      describe("Artsy Vanguard 2019", () => {
        it("/series/artsy-vanguard-2019", () => {
          visitWithStatusRetries("series/artsy-vanguard-2019")
          cy.get("h1").should("contain", "The Artsy Vanguard 2019")
          cy.title().should(
            "eq",
            "The Artsy Vanguard 2019: 50 Artists to Know Right Now | Artsy"
          )
        })

        it("/series/artsy-vanguard-2019/:slug", () => {
          visitWithStatusRetries("series/artsy-vanguard-2019/15-artists-2019")
          cy.get("h1").should("contain", "Getting Their Due")
          cy.title().should(
            "eq",
            "The Artsy Vanguard 2019: 15 Artists Getting Their Due | Artsy"
          )
        })
      })
    })
  })
})
