describe("partner/:partner_id", () => {
  before(() => {
    cy.visit("partner/gagosian")
  })

  it("renders metadata", () => {
    cy.title().should(
      "eq",
      "Gagosian | Artists, Art for Sale, and Contact Info | Artsy"
    )
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "eq",
        "Gagosian is a global gallery specializing in modern and contemporary art with nineteen locations worldwide."
      )
  })

  it("renders page content", () => {
    cy.get("h1").should("contain", "Gagosian")
  })

  it.skip("shows the list of shows", () => {
    cy.visit("partner/gagosian/shows")
    cy.contains("Past Events")
  })

  it("shows partner artists", () => {
    cy.visit("partner/gagosian/artists")
    cy.contains("Artists")
  })

  it("shows partner articles", () => {
    cy.visit("partner/gagosian/articles")
    cy.contains("Articles")
  })

  it.skip("does not show contact information for non-active partner", () => {
    // TODO: cy.visit(":partner_id/contact")
    cy.contains(
      "Sorry, the page you were looking for doesn&#x2019;t exist at this URL."
    )
  })

  it("show contact information for active partner", () => {
    cy.visit("partner/gagosian/contact")
    cy.contains("New York")
    cy.contains("Locations")
  })
})
