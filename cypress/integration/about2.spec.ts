import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("About", () => {
  it("renders page content", () => {
    visitWithStatusRetries("about2")
    cy.get("h1").should("contain", "For the Love of Art")
    cy.title().should("eq", "About | Artsy")
  })
})
