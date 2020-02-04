describe("/dev/blank", () => {
  it("renders a blank page for Eigen", () => {
    cy.visit("/dev/blank")
    cy.contains("page intentionally left blank")
  })
})
