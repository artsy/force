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

  // TODO: Currently throws an error. Likely needs an additional ENV var.
  it.skip("/auction-partnerships", () => {
    visitWithStatusRetries("auction-partnerships")
    cy.get("h1").should("contain", "Artsy for Auctions")
    cy.title().should("eq", "Auction Partnerships | Artsy")
  })
})
