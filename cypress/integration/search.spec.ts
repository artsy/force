import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Search", () => {
  it("/search?:query", () => {
    visitWithStatusRetries("/search?term=andy")
    cy.get("#react-root").should("contain", "results for \u201Candy\u201D")
    cy.title().should("eq", "Search Results for 'andy' | Artsy")
  })
})
