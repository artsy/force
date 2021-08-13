import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

// TODO: Currently throwing error. Likely needs additional ENV var.
describe("About", () => {
  it("/about", () => {
    visitWithStatusRetries("about")
    cy.get("h1").should("contain.text", "The Art WorldOnline")
    cy.title().should("eq", "About | Artsy")
  })
})
