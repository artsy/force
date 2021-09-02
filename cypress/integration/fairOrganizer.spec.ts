import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("FairOrganizer", () => {
  it("/fair-organizer/:slug", () => {
    visitWithStatusRetries("fair-organizer/dallas-art-fair")
    cy.contains("Explore Dallas Art Fair on Artsy").should("exist")
    cy.title().should("eq", "Dallas Art Fair | Artsy")
  })

  it("/fair-organizer/:slug/articles", () => {
    visitWithStatusRetries("fair-organizer/dallas-art-fair/articles")
    cy.contains("All Articles for Dallas Art Fair on Artsy").should("exist")
    cy.title().should("eq", "Dallas Art Fair | Artsy")
  })
})
