describe("user/shipping", () => {
  describe("unauthenticated", () => {
    it("redirects to the login page", () => {
      cy.visit("user/shipping")
      cy.contains("Log in")
    })
  })
})
