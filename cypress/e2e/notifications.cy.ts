/* eslint-disable jest/expect-expect */

describe("/notifications", () => {
  describe("unauthenticated", () => {
    it("redirects to the login page", () => {
      cy.visit("/notifications")
      cy.contains("Log in to collect art by the world’s leading artists")
    })
  })
})
