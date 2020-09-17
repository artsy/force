import { artworkGridRenders } from "../helpers/artworkGridRenders"

describe("/collect", () => {
  before(() => {
    cy.visit("/collect")
  })

  it("renders metadata", () => {
    cy.title().should("eq", "Collect | Artsy")
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "eq",
        "Find artworks by subject matter, style/technique, movement, price, and gallery/institution."
      )
  })

  it("renders page content", () => {
    cy.get("h1").should("contain", "Collect art and design online")
    artworkGridRenders()
  })
})
