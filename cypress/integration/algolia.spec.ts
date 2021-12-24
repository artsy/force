import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Search", () => {
  it("/algolia/results?:query", () => {
    visitWithStatusRetries("/algolia/results?query=andy")
    cy.title().should("eq", "Search Results for 'andy' | Artsy")
  })
})
