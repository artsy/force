describe("/ (home)", () => {
  it("renders metadata and page content", () => {
    cy.visit("/")
    cy.get("h2").should("contain", "Featured Categories")
    cy.title().should("eq", "Artsy - Discover & Buy Art")
  })
})
