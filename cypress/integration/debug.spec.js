describe("/debug/baseline", () => {
  it("renders a blank page", () => {
    cy.visit("/debug/baseline")
    cy.contains("Baseline")
  })
})
