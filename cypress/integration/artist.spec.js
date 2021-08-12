/* eslint-disable jest/expect-expect */
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
        "Find the latest shows, biography, and artworks for sale by Pablo Picasso. Perhaps the most influential artist of the 20th century, Pablo Picasso may be best …"
      )
  })

  it("renders page content", () => {
    cy.get("h1").should("contain", "Pablo Picasso")
    cy.get("h2").should("contain", "Spanish, 1881–1973")
    cy.get("h2").should("contain", "Notable works")
  })
})

//
