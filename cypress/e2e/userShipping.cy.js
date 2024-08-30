describe("user/shipping", () => {
  describe("unauthenticated", () => {
    it("redirects to the login page", () => {
      cy.visit("user/shipping")
      cy.contains("Sign up or log in")
    })
  })
})
