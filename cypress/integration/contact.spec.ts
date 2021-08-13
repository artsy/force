import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

// TODO: Currently throws an error. Likely needs an additional ENV var.
describe("Contact", () => {
  it("/contact", () => {
    visitWithStatusRetries("contact")
    cy.get("h1").should("contain", "Contact Us")
    cy.title().should("eq", "Contact Us | Artsy")
  })
})
