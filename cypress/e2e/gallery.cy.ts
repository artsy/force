import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Gallery", () => {
  it("/:gallery_slug", () => {
    visitWithStatusRetries("gallery-m")
    cy.get("h1").should("contain", "GALLERY M")
    cy.title().should(
      "eq",
      "GALLERY M | Artists, Art for Sale, and Contact Info | Artsy"
    )
  })
})
