/* eslint-disable jest/expect-expect */

describe("/notifications", () => {
  describe("unauthenticated", () => {
    it("redirects to the login page", () => {
      cy.visit("/notifications")
      cy.contains("Sign up or log in")
    })
  })
})
