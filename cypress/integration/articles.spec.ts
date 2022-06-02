import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Articles", () => {
  describe("Editorial", () => {
    it("/articles", () => {
      visitWithStatusRetries("articles")
      cy.title().should("eq", "Editorial | Artsy")
    })

    it("/editorial", () => {
      visitWithStatusRetries("articles")
      cy.title().should("eq", "Editorial | Artsy")
    })

    it("/magazine", () => {
      visitWithStatusRetries("magazine")
      cy.title().should("eq", "Editorial | Artsy")
    })

    it("/news", () => {
      visitWithStatusRetries("news")
      cy.title().should("eq", "News | Artsy")
    })

    describe("Editorial features", () => {
      it("/venice-biennale-2015", () => {
        visitWithStatusRetries("venice-biennale-2015")
        cy.title().should(
          "eq",
          "56th Venice Biennale | Artists, Artworks, and Contact Info | Artsy"
        )
      })
    })
  })

  describe("Team Blogs (channels)", () => {
    it("/channel/artsy-education", () => {
      visitWithStatusRetries("channel/artsy-education")
      cy.title().should("eq", "Artsy for Education | Artsy")
    })

    it("/channel/buying-with-artsy", () => {
      visitWithStatusRetries("channel/buying-with-artsy")
      cy.title().should("eq", "Buying with Artsy | Artsy")
    })

    it("/jobs", () => {
      visitWithStatusRetries("jobs")
      cy.title().should("eq", "Jobs | Artsy")
    })

    it("/channel/life-at-artsy", () => {
      visitWithStatusRetries("channel/life-at-artsy")
      cy.title().should("eq", "Life at Artsy | Artsy")
    })
  })
})
