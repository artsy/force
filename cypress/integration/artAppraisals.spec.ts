describe("/art-appraisals", () => {
  it("renders the page", () => {
    cy.visit("art-appraisals")
    cy.contains("Art Appraisals")
  })
})
