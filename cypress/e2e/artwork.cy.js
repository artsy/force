describe("/artwork/:id", () => {
  before(() => {
    cy.visit("/artwork/pablo-picasso-guernica")
  })

  it("renders metadata", () => {
    cy.title().should("contain", "Pablo Picasso | Guernica (1937) | Artsy")
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "eq",
        "From Museo Reina Sofía, Pablo Picasso, Guernica (1937), Oil on canvas, 349.3 × 776.6 cm"
      )
  })

  it("renders page content", () => {
    cy.get("h1").should("contain", "Guernica, 1937")
    cy.contains("Museo Reina Sofía")
  })

  it("renders a 404", () => {
    cy.request({ url: "/artwork/blahblahblah", failOnStatusCode: false })
      .its("status")
      .should("equal", 404)
    cy.visit("/artwork/blahblahblah", { failOnStatusCode: false })
  })
})
