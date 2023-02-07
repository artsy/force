import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Consign", () => {
  it.skip("/sell", () => {
    // pending until the redesign is no longer under a feature flag
    visitWithStatusRetries("sell")
    cy.get("h1").should("contain", "Sell art from your collection")
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
