import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Home", () => {
  it("/", () => {
    visitWithStatusRetries("/")
    cy.get("h1").should("contain", "Post-War and Contemporary")
  })
})
