/* eslint-disable jest/expect-expect */

describe("settings", () => {
  describe("unauthenticated", () => {
    it.skip("redirects to the homepage", () => {
      cy.visit("settings")
      cy.location("pathname", { timeout: 10000 }).should("eq", "/")
    })
  })
})
