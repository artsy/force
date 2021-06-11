import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Features", () => {
  it("/feature/anti-racism-resources-in-the-art-world", () => {
    visitWithStatusRetries("feature/anti-racism-resources-in-the-art-world")
    cy.get("h1").should("contain", "Anti-Racism Resources in the Art World")
    cy.title().should("eq", "Anti-Racism Resources in the Art World | Artsy")
  })
})
