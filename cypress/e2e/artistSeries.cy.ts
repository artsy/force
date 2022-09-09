import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("ArtistSeries", () => {
  it("/artist-series/:id", () => {
    visitWithStatusRetries("artist-series/kaws-companions")
    cy.get("h1").should("contain", "Companions")
    cy.title().should("contain", "KAWS")
  })
})
