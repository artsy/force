import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Auctions", () => {
  it("/auctions", () => {
    visitWithStatusRetries("auctions")
    cy.get("h1").should("contain", "Auctions")
    cy.title().should(
      "eq",
      "Auctions on Artsy | Premium Artworks from In-Demand Artists"
    )
  })

  it("/auction-partnerships", () => {
    visitWithStatusRetries("auction-partnerships")
    cy.get("h1").should("contain", "Artsy for Auctions")
    cy.title().should("eq", "Auction Partnerships | Artsy")
  })
})
