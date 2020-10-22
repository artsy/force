describe("/collections", () => {
  before(() => {
    cy.visit("collections")
  })

  it("renders metadata", () => {
    cy.title().should("eq", "Collections | Artsy")
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "eq",
        "Discover collections of art curated by Artsy Specialists. From iconic artist series to trending design, shop collections on the world's largest online art marketplace."
      )
  })

  it("renders page header content", () => {
    cy.get("h1").should("contain", "Collections")
    cy.contains("View works")
  })

  it("renders collection categories", () => {
    cy.get("a#collectible-sculptures")
      .siblings("div")
      .should("contain", "Collectible Sculptures")
    cy.get("a#abstract-art").siblings("div").should("contain", "Abstract Art")
    cy.get("a#contemporary").siblings("div").should("contain", "Contemporary")
  })

  it("renders collection links", () => {
    cy.contains("Minimalist Prints")
    cy.contains("Gifts under $1,000")
    cy.contains("Latin American Artists")
  })
})
