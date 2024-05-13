import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Institutions", () => {
  it("/institutions", () => {
    visitWithStatusRetries("institutions")
    cy.get("h1").should("contain", "Browse Museums and Institutions")
    cy.title().should("eq", "Institutions | Artsy")
  })

  it("/institution-partnerships", () => {
    visitWithStatusRetries("institution-partnerships")
    cy.get("h1").should("contain", "Artsy for Museums")
    cy.title().should("eq", "Institution Partnerships | Artsy")
  })
})
