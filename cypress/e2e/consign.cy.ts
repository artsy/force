import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Consign", () => {
  it("/sell", () => {
    visitWithStatusRetries("sell")
    cy.get("h1").should("contain", "Sell Artworks from Your Collection")
    cy.title().should("eq", "Sell Artwork with Artsy | Art Consignment | Artsy")
  })

  // TODO:- Provide helpers for feature flag usage in cypress
  // This test will fail whenever the reorder flag is enabled.
  it("/sell/submission", function () {
    this.skip()
    visitWithStatusRetries("sell/submission")
    cy.get("h1").should("contain", "Tell us about your artwork")
    cy.title().should(
      "eq",
      "Sell Art from Your Collection | Consignments | Artsy"
    )
  })
})
