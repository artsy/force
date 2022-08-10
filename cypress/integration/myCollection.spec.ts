/* eslint-disable jest/expect-expect */

describe("/my-collection/artwork/:artworkSlug", () => {
  before(() => {
    cy.visit("/my-collection/artwork/pablo-picasso-guernica")
  })

  it("renders the empty page content", () => {
    cy.contains("YOU'RE HERE!")
  })
})
