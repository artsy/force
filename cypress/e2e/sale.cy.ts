describe("/sale/:id", () => {
  before(() => {
    cy.visit("/sale/featured-works-for-sale")
  })

  it("renders metadata", () => {
    cy.title().should("contain", "Featured works for sale | Artsy")
  })

  it("renders page content", () => {
    cy.get("h1").should("contain", "Featured works for sale")
    cy.url().should("contain", "/sale/")
  })
})
