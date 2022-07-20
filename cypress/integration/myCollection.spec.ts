describe("myCollection", () => {
  describe("unauthenticated", () => {
    it("redirects to the login page", () => {
      cy.visit("my-collection")
      cy.contains("Log in to Artsy")
    })
  })
})
