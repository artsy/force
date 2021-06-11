import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Tag", () => {
  it("/tag/:id", () => {
    visitWithStatusRetries("tag/orange")
    cy.get("h1").should("contain", "Orange")
    cy.title().should("eq", "Orange | Artsy")
  })
})
