import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Galleries", () => {
  it("/galleries", () => {
    visitWithStatusRetries("galleries")
    cy.get("h1").should("contain", "Browse Galleries")
    cy.title().should("eq", "Galleries | Artsy")
  })
})
