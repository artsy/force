import { artworkGridRenders } from "../helpers/artworkGridRenders"

describe("/collection/:id", () => {
  it("renders metadata and page content", () => {
    cy.visit("/collection/emerging-photographers")
    cy.title().should("eq", "Emerging Photographers - For Sale on Artsy")
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "eq",
        "Buy, bid, and inquire on Emerging Photographers on Artsy. Today’s leading photographers are pushing the medium into new territories—experimenting with digital manipulation, unleashing the power of new macro lenses..."
      )

    cy.get("h1").should("contain", "Emerging Photographers")
    artworkGridRenders()
  })
})

describe("/collection/:id (a collection hub)", () => {
  it("renders metadata and page content", () => {
    cy.visit("/collection/contemporary")
    cy.title().should("eq", "Contemporary Art - For Sale on Artsy")
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "eq",
        "Buy, bid, and inquire on Contemporary Art on Artsy. Spanning from 1970 to the present day, the contemporary period of art history represents the most diverse and widely-collected era of artistic production. ..."
      )

    cy.get("h1").should("contain", "Contemporary")
    artworkGridRenders()
  })
})

describe("redirection", () => {
  it("redirects selected collections to artist series", () => {
    cy.visit("/collection/albrecht-durer-engraving")
    cy.location("pathname").should(
      "eq",
      "/artist-series/albrecht-durer-etchings-and-engravings"
    )

    cy.visit("/collection/zeng-fanzhi-mask-series")
    cy.location("pathname").should(
      "eq",
      "/artist-series/zeng-fanzhi-ceng-fan-zhi-mask-series"
    )
  })
})
