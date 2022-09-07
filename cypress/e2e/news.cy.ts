import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("News", () => {
  it("renders the page", () => {
    visitWithStatusRetries("news")
    cy.title().should("eq", "News | Artsy")
  })
})
