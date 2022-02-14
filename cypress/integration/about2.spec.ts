describe("About", () => {
  it("renders page content", () => {
    cy.get("h1").should("contain", "For the Love of Art")
    cy.title().should("eq", "About | Artsy")
  })
})
