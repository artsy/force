describe("partner/:partner_id", () => {
  before(() => {
    cy.visit("partner/maison-gerard")
  })

  it("renders metadata", () => {
    cy.title().should(
      "eq",
      "Maison Gerard | Artists, Art for Sale, and Contact Info | Artsy"
    )
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "eq",
        "Since 1974, Maison Gerard has specialized in fine French Art Deco furniture, lighting and objets d’art, with a …"
      )
  })

  it("renders page content", () => {
    cy.get("h1").should("contain", "Maison Gerard")
  })

  it.skip("shows the list of shows", () => {
    cy.visit("partner/maison-gerard/shows")
    cy.contains("Past Events")
  })

  it("shows partner artists", () => {
    cy.visit("partner/maison-gerard/artists")
    cy.contains("Artists")
  })

  it("shows partner articles", () => {
    cy.visit("partner/maison-gerard/articles")
    cy.contains("Articles")
  })

  it.skip("does not show contact information for non-active partner", () => {
    // TODO: cy.visit(":partner_id/contact")
    cy.contains(
      "Sorry, the page you were looking for doesn&#x2019;t exist at this URL."
    )
  })

  it("show contact information for active partner", () => {
    cy.visit("partner/maison-gerard/contact")
    cy.contains("New York")
    cy.contains("Locations")
  })
})
