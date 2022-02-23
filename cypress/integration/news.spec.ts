import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("News", () => {
  it("renders the page", () => {
    visitWithStatusRetries("news2")
    cy.title().should("eq", "News | Artsy")
  })
})
