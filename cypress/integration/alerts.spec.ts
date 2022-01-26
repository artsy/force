describe("/alerts", () => {
  before(() => {
    cy.visit("/alerts")
  })

  it("Alerts", () => {
    cy.title().should("eq", "Your Alerts")
  })
})
