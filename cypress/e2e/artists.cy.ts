import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Artists", () => {
  it("/artists", () => {
    visitWithStatusRetries("artists")
    cy.get("h1").should("contain", "Featured Artists")
    cy.title().should(
      "eq",
      "Browse Artists on Artsy | Modern and Contemporary Artists"
    )
  })
})
