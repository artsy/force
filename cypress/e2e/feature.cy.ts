import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Features", () => {
  it("/feature/the-artsy-vanguard-2020", () => {
    visitWithStatusRetries("feature/the-artsy-vanguard-2020")
    cy.get("h1").should("contain", "The Artsy Vanguard 2020")
    cy.title().should("eq", "The Artsy Vanguard 2020 | Artsy")
  })
})
