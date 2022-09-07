describe("/system/up", () => {
  it("should not render a page for /system/up healthcheck endpoint", () => {
    cy.request("/system/up")
      .its("headers")
      .its("content-type")
      .should("include", "application/json")
  })

  describe("mobile", () => {
    before(() => {
      cy.viewport("iphone-x")
    })

    it("should not render a page for /system/up healthcheck endpoint", () => {
      cy.request("/system/up")
        .its("headers")
        .its("content-type")
        .should("include", "application/json")
    })
  })
})
