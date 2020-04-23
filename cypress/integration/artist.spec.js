import { artworkGridRenders } from "../helpers/artworkGridRenders"

describe("/artist/:id", () => {
  before(() => {
    cy.visit("/artist/pablo-picasso")
  })

  it("renders metadata", () => {
    cy.title().should("contain", "Pablo Picasso")
    cy.title().should("contain", "Artworks, Bio & Shows on Artsy")
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "eq",
        "Find the latest shows, biography, and artworks for sale by Pablo Picasso. A prolific and tireless innovator of art forms, Pablo Picasso impacted the course o…"
      )
  })

  it("renders page content", () => {
    cy.get("h1").should("contain", "Pablo Picasso")
    cy.get("h2").should("have.text", "Spanish, 1881–1973")
  })
})
