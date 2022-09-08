import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Institution", () => {
  it("/:institution_slug", () => {
    visitWithStatusRetries("the-national-gallery-london")
    cy.get("h1").should("contain", "The National Gallery, London")
    cy.title().should(
      "eq",
      "The National Gallery, London | Artists, Artworks, and Contact Info | Artsy"
    )
  })
})
