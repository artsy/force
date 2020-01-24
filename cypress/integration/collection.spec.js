import { artworkGridRenders } from "../helpers/artworkGridRenders"

describe("/collection/:id", () => {
  before(() => {
    cy.visit("/collection/emerging-photographers")
  })

  it("renders metadata", () => {
    cy.title().should("eq", "Emerging Photographers - For Sale on Artsy")
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "eq",
        "Buy, bid, and inquire on Emerging Photographers on Artsy. Today’s leading photographers are pushing the medium into new territories&mdash;experimenting with digital manipulation, unleashing the power of new macro …"
      )
  })

  it("renders page content", () => {
    cy.get("h1").should("contain", "Emerging Photographers")
    artworkGridRenders()
  })
})

describe("/collection/:id (a collection hub)", () => {
  before(() => {
    cy.visit("/collection/contemporary")
  })
  it("renders metadata", () => {
    cy.title().should("eq", "Contemporary - For Sale on Artsy")
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "eq",
        "Buy, bid, and inquire on Contemporary on Artsy. Spanning from 1970 to the present day, the contemporary period of art history represents the most diverse and widely-collected era of artistic production. …"
      )
  })

  it("renders page content", () => {
    cy.get("h1").should("contain", "Contemporary")
    artworkGridRenders()
  })
})
