/* eslint-disable jest/expect-expect */

describe("/my-collection/artwork/:artworkID", () => {
  before(() => {
    cy.visit("/my-collection/artwork/trudy-benson-boost")
  })

  it("renders page content", () => {
    cy.get("h1").should("contain", "Trudy Benson")
    cy.get("h1").should("contain", "Boost, 2022")
    cy.contains("Unique work")
  })
})
