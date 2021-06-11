import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Gene", () => {
  it("/gene/:id", () => {
    visitWithStatusRetries("gene/contemporary-figurative-painting")
    cy.get("h1").should("contain", "Contemporary Figurative Painting")
    cy.title().should("eq", "Contemporary Figurative Painting | Artsy")
  })
})
