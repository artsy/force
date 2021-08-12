import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("FairOrganizer", () => {
  it("/fair-organizer/:slug", () => {
    visitWithStatusRetries("fair-organizer/art-paris")
    cy.contains("Explore Art Paris on Artsy").should("exist")
    cy.title().should("eq", "Art Paris | Artsy")
  })

  it("/fair-organizer/:slug/articles", () => {
    visitWithStatusRetries("fair-organizer/art-paris/articles")
    cy.contains("All Articles for Art Paris on Artsy").should("exist")
    cy.title().should("eq", "Art Paris | Artsy")
  })
})
