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
    cy.title().should(
      "eq",
      "Sell Art from Your Collection | Consignments | Artsy"
    )
  })
  it("CTA buttons appear after the hero section scrolled", () => {
    visitWithStatusRetries("sell2")

    cy.scrollTo(0, 0)
    cy.get("div")
      .contains(
        "Submit an artwork, or contact an Artsy specialist to discuss selling with us."
      )
      .should("not.exist")

    cy.scrollTo(0, 1000)
    cy.get("div")
      .contains(
        "Submit an artwork, or contact an Artsy specialist to discuss selling with us.",
        {
          timeout: 10000,
        }
      )
      .should("exist")
  })
})
