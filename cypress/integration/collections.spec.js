describe("/collections", function() {
  it("renders a title", () => {
    cy.visit("collections")
    cy.get("h1").should("contain", "Collections")
    cy.title().should("eq", "Collections | Artsy")
  })
})
