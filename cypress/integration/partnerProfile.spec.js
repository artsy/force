describe("partner/:partner_id", () => {
  before(() => {
    cy.visit("partner/mariane-ibrahim-gallery")
  })

  it("renders metadata", () => {
    cy.title().should(
      "eq",
      "Mariane Ibrahim Gallery | Artists, Art for Sale, and Contact Info | Artsy"
    )
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "eq",
        "Seven years after founding her namesake gallery in Seattle, Ibrahim and her program officially launched their next space in Chicago in 2019. Mariane Ibrahim …"
      )
  })

  it("renders page content", () => {
    cy.get("h1").should("contain", "Mariane Ibrahim Gallery")
  })

  it("shows the list of shows", () => {
    cy.visit("partner/mariane-ibrahim-gallery/shows")
    cy.contains("Past Events")
  })

  it("shows partner artists", () => {
    cy.visit("partner/mariane-ibrahim-gallery/artists")
    cy.contains("Artists")
  })

  it("shows partner articles", () => {
    cy.visit("partner/mariane-ibrahim-gallery/articles")
    cy.contains("Articles")
  })

  it.skip("does not show contact information for non-active partner", () => {
    // TODO: cy.visit(":partner_id/contact")
    cy.contains(
      "Sorry, the page you were looking for doesn&#x2019;t exist at this URL."
    )
  })

  it("show contact information for active partner", () => {
    cy.visit("partner/mariane-ibrahim-gallery/contact")
    cy.contains("Chicago")
    cy.contains("Locations")
  })
})
