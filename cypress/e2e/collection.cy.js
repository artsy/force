import { artworkGridRenders } from "../helpers/artworkGridRenders"
import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

// FIXME: Remove skip once Staging is back up
describe.skip("/collection/:id", () => {
  beforeEach(() => {
    visitWithStatusRetries("/collection/emerging-photographers")
  })

  it("renders metadata and page content", () => {
    cy.title().should("eq", "Emerging Photographers - For Sale on Artsy")
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "eq",
        "Buy, bid, and inquire on Emerging Photographers on Artsy. Today’s leading photographers are pushing the medium into new territories&mdash;experimenting with digital manipulation, unleashing the power of new macro …"
      )

    cy.get("h1").should("contain", "Emerging Photographers")
    artworkGridRenders()
  })
})

// FIXME: Remove skip once Staging is back up
describe.skip("/collection/:id (a collection hub)", () => {
  beforeEach(() => {
    visitWithStatusRetries("/collection/contemporary")
  })

  it("renders metadata and page content", () => {
    cy.title().should("eq", "Contemporary Art - For Sale on Artsy")
    cy.get("meta[name='description']")
      .should("have.attr", "content")
      .and(
        "eq",
        "Buy, bid, and inquire on Contemporary Art on Artsy. Spanning from 1970 to the present day, the contemporary period of art history represents the most diverse and widely-collected era of artistic production. …"
      )

    cy.get("h1").should("contain", "Contemporary")
    artworkGridRenders()
  })
})
