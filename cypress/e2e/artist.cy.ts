import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("/artist/:id", () => {
  before(() => {
    visitWithStatusRetries("/artist/pablo-picasso/about", {
      timeout: 30000,
    })
  })

  it("renders metadata", () => {
    cy.title().should(
      "contain",
      "Pablo Picasso - Biography, Shows, Articles & More | Artsy"
    )
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "contain",
        "Explore Pablo Picasso’s biography, achievements, artworks, auction results, and shows on Artsy. Perhaps the most influential artist of the 20th century, Pablo Picasso"
      )
  })

  it("renders page content", () => {
    cy.get("h1").should("contain", "Pablo Picasso")
    cy.get("h2").should("contain", "Spanish, 1881–1973")
  })
})
