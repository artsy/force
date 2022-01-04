import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Search", () => {
  it("/search2/results?:query", () => {
    visitWithStatusRetries("/search2/results?query=andy")
    cy.title().should("eq", "Search Results for 'andy' | Artsy")
  })
})
