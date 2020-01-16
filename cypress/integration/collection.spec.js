describe("/collection/:id", function() {
  it("renders a title", () => {
    cy.visit("/collection/emerging-photographers")
    cy.get("h1").should("contain", "Emerging Photographers")
    cy.title().should("eq", "Emerging Photographers - For Sale on Artsy")
  })
})

describe("/collection/:id (a collection hub)", function() {
  it("renders a title", () => {
    cy.visit("/collection/contemporary")
    cy.get("h1").should("contain", "Contemporary")
    cy.title().should("eq", "Contemporary - For Sale on Artsy")
  })
})
