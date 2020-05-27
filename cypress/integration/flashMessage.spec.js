describe("flash_message", () => {
  it("renders the email confirmed banner when ?flash_message is confirmed", () => {
    cy.visit("/?flash_message=confirmed")
    cy.get("#main-layout-header").should(
      "contain",
      "Your email has been confirmed"
    )
  })

  it("ignores flash messages that aren't explicitly supported", () => {
    cy.visit("/?flash_message=l33thaxor")
    cy.get("#main-layout-header").should("not.contain", "l33thaxor")
  })
})
