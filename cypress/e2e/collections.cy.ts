// context: https://artsy.slack.com/archives/C02BC3HEJ/p1662560324260439?thread_ts=1662541292.220899&cid=C02BC3HEJ
describe.skip("/collections", () => {
  before(() => {
    cy.visit("collections", { timeout: 60000 })
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
    cy.get("#collectible-sculptures")
      .siblings("div")
      .should("contain", "Collectible Sculptures")
    cy.get("#abstract-art").siblings("div").should("contain", "Abstract Art")
    cy.get("#genre").siblings("div").should("contain", "Genre")
  })

  it("renders collection links", () => {
    cy.contains("Graffiti")
    cy.contains("Essential KAWS")
    cy.contains("Emerging Street Art")
  })
})
