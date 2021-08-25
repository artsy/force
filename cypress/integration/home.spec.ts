import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Home", () => {
  it("/", () => {
    visitWithStatusRetries("/")
    cy.get("h1").should("contain", "Collect art by the world's leading artists")
  })
})
