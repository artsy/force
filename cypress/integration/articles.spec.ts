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
      cy.title().should("eq", "News")
    })

    describe("Editorial features", () => {
      it("/venice-biennale-2015", () => {
        visitWithStatusRetries("venice-biennale-2015")
        cy.title().should("eq", "Venice Biennale 2015 Guide | Artsy")
      })
    })
  })

  describe("Team Blogs (channels)", () => {
    it("/artsy-education", () => {
      visitWithStatusRetries("artsy-education")
      cy.title().should("eq", "Artsy for Education")
    })

    it("/buying-with-artsy", () => {
      visitWithStatusRetries("buying-with-artsy")
      cy.title().should("eq", "Buying with Artsy")
    })

    it("/jobs", () => {
      visitWithStatusRetries("jobs")
      cy.title().should("eq", "Jobs | Artsy")
    })

    it("/life-at-artsy", () => {
      visitWithStatusRetries("life-at-artsy")
      cy.title().should("eq", "Life at Artsy")
    })
  })
})
