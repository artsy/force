import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Institutions", () => {
  it("/institutions", () => {
    visitWithStatusRetries("institutions")
    cy.get("h1").should("contain", "Browse Institutions")
    cy.title().should("eq", "Institutions | Artsy")
  })

  // TODO: Currently throws an error. Likely needs an additional ENV var.
  it.skip("/institution-partnerships", () => {
    visitWithStatusRetries("institution-partnerships")
    cy.get("h1").should("contain", "Artsy for Museums")
    cy.title().should("eq", "Institution Partnerships | Artsy")
  })
})
