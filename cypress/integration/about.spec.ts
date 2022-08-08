import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("About", () => {
  it("renders page content", () => {
    visitWithStatusRetries("about")
    cy.get("h1").should("contain", "The Future of Art Collecting")
    cy.title().should("eq", "About | Artsy")
  })
})
