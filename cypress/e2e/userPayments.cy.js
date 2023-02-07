describe("user/payments", () => {
  describe("unauthenticated", () => {
    it("redirects to the login page", () => {
      cy.visit("user/payments")
      cy.contains("Log in to collect art by the world’s leading artists")
    })
  })
})
