import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Home", () => {
  // add this back in once we revert the suppression
  it.skip("/", () => {
    visitWithStatusRetries("/")
    cy.get("h1").should("contain", "Collect art by the world’s leading artists")
  })
})
