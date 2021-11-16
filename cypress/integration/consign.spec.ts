import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Consign", () => {
  it("/consign", () => {
    visitWithStatusRetries("consign")
    cy.get("h1").should("contain", "Sell with Artsy")
    cy.title().should("eq", "Sell Artwork with Artsy | Art Consignment | Artsy")
  })
  it("/consign/submission", () => {
    visitWithStatusRetries("consign/submission")
    cy.get("h1").should("contain", "Tell us about your artwork")

    // TODO: SWA-77
    // cy.get(".consignments-submission-flow").should(
    //   "contain",
    //   "Enter the name of the artist/designer who created the work"
    // )

    cy.title().should(
      "eq",
      "Sell Art from Your Collection | Consignments | Artsy"
    )
  })
})
