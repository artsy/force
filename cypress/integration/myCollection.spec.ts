describe("myCollection", () => {
  describe("unauthenticated", () => {
    it("redirects to the homepage", () => {
      cy.visit("my-collection")
      cy.location("pathname", { timeout: 10000 }).should("eq", "/")
    })
  })
})
