describe("/:partner_id", () => {
  before(() => {
    cy.visit("gagosian-gallery")
  })

  it("renders metadata", () => {
    cy.title().should(
      "eq",
      "Gagosian | Artists, Art for Sale, and Contact Info | Artsy"
    )
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and("eq", "Explore Artists, Artworks, and Shows from Gagosian on Artsy")
  })

  it("renders page content", () => {
    cy.get("h1").should("contain", "Gagosian")
  })

  context("mobile", () => {
    before(() => {
      cy.viewport("iphone-x")
      cy.visit("gagosian-gallery")
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
          "Explore Artists, Artworks, and Shows from Gagosian on Artsy"
        )
    })

    it("renders page content", () => {
      cy.get("h1").should("contain", "Gagosian")
    })

    it("shows the list of shows", () => {
      cy.visit("gagosian-gallery/shows")
      cy.contains("Current Shows")
    })
    it("shows partner articles", () => {
      cy.visit("gagosian-gallery/articles")
      cy.contains("Articles")
    })

    xit("does not show contact information for non-active partner", () => {
      // TODO: cy.visit(":partner_id/contact")
      cy.contains(
        "Sorry, the page you were looking for doesn&#x2019;t exist at this URL."
      )
    })
    it("show contact information for active partner", () => {
      cy.visit("gagosian-gallery/contact")
      cy.contains("New York")
    })
  })
})
