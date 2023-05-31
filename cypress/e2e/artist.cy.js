/* eslint-disable jest/expect-expect */
describe("/artist/:id", () => {
  before(() => {
    cy.visit("/artist/pablo-picasso")
  })

  it("renders metadata", () => {
    cy.title().should(
      "contain",
      "Pablo Picasso - Artworks for Sale & More | Artsy"
    )
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "contain",
        "Discover and purchase Pablo Picasso’s artworks, available for sale. Browse our selection of paintings, prints, and sculptures by the artist, and find art you love."
      )
  })

  it("renders page content", () => {
    cy.get("h1").should("contain", "Pablo Picasso")
    cy.get("h2").should("contain", "Spanish, 1881–1973")
  })
})
