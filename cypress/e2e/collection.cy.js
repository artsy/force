import { artworkGridRenders } from "../helpers/artworkGridRenders"
import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("/collection/:id", () => {
  beforeEach(() => {
    visitWithStatusRetries("/collection/emerging-photographers")
  })

  it("renders metadata and page content", () => {
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
  beforeEach(() => {
    visitWithStatusRetries("/collection/contemporary")
  })

  it("renders metadata and page content", () => {
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
    visitWithStatusRetries("/collection/albrecht-durer-engraving")
    cy.location("pathname").should(
      "eq",
      "/artist-series/albrecht-durer-etchings-and-engravings"
    )

    visitWithStatusRetries("/collection/zeng-fanzhi-mask-series")
    cy.location("pathname").should(
      "eq",
      "/artist-series/zeng-fanzhi-ceng-fan-zhi-mask-series"
    )
  })
})
