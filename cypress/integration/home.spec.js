describe("home", () => {
  it("renders meta title and page content", () => {
    cy.visit("/")
    cy.get("h1").should("contain", "Works by popular artists")
    cy.title().should("eq", "Artsy - Discover & Buy Art")
  })
})
