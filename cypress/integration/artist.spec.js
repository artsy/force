describe("artist", () => {
  it("renders meta title and page content", () => {
    cy.visit("/artist/pablo-picasso")
    cy.get("h1").should("contain", "Pablo Picasso")
    cy.get("h2").should("contain", "Spanish, 1881-1973")
    cy.title().should("contain", "Pablo Picasso")
    cy.title().should("contain", "Artworks, Bio & Shows on Artsy")
  })
})
