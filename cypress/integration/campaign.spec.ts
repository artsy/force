import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Campaigns", () => {
  it("/campaign/:id", () => {
    visitWithStatusRetries("art-keeps-going")
    cy.title().should("eq", "Art Keeps Going")
  })
})
