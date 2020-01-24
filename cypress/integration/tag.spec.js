describe("/tag/:id", () => {
  before(() => {
    cy.visit("tag/cow")
  })

  it("renders metadata", () => {
    cy.title().should("eq", "Cow | Artsy")
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "eq",
        "Browse all artworks with the Cow tag on Artsy. Artsy has the largest collection of art on the Web; browse art by subject matter, medium, size and price."
      )
  })

  it("renders page content", () => {
    cy.get("h1")
      .should("contain", "Artwork related to")
      .and("contain", "Cow")
  })
})
