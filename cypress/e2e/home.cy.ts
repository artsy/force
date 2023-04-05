import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Home", () => {
  it("/", () => {
    visitWithStatusRetries("/")
    cy.title().should("eq", "Artsy — Discover, Buy, and Sell Fine Art")
  })
})
