describe("user/alerts", () => {
  describe("unauthenticated", () => {
    it("redirects to the login page", () => {
      cy.visit("user/alerts")
      cy.contains("Sign up or log in")
    })
  })
})
