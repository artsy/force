describe("user/payments", () => {
  describe("unauthenticated", () => {
    it("redirects to the login page", () => {
      cy.visit("user/payments")
      cy.contains("Log in")
    })
  })
})
