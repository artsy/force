import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("New Works From Galleries You Follow", () => {
  it("/new-works-from-galleries-you-follow", () => {
    visitWithStatusRetries("new-works-from-galleries-you-follow")
    cy.get("h1").should("contain", "New Works From Galleries You Follow")
    cy.title().should("eq", "New Works From Galleries You Follow | Artsy")
  })
})
