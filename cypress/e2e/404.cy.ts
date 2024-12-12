describe("404", () => {
  it("renders 404 page", () => {
    cy.visit("/oh-no-some-404", { failOnStatusCode: false })

    cy.get("div").should(
      "contain",
      "Sorry, the page you were looking for doesn’t exist at this URL."
    )
  })
})
