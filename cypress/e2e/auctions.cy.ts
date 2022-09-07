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
})
