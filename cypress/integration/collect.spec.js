describe("/collect", function() {
  it("renders meta and page content", () => {
    cy.visit("/collect")
    cy.get("h1").should("contain", "Collect art and design online")
    cy.title().should("eq", "Collect | Artsy")
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "eq",
        "Find artworks by subject matter, style/technique, movement, price, and gallery/institution."
      )
  })

  // TODO: confirm artwork grid is present
})
