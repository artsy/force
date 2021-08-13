/* eslint-disable jest/expect-expect */
import { artworkGridRenders } from "../helpers/artworkGridRenders"

describe("/collect", () => {
  it("renders collect page content", () => {
    cy.visit("/collect")
    cy.title().should("eq", "Collect | Artsy")
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "eq",
        "Find artworks by subject matter, style/technique, movement, price, and gallery/institution."
      )
    cy.get("h1").should("contain", "Collect art and design online")
    artworkGridRenders()
  })

  it("renders medium-specific content", () => {
    cy.visit("/collect/painting")
    cy.title().should("eq", "Paintings - For Sale on Artsy")
    cy.get("h1").should("contain", "Collect art and design online")
  })
})
