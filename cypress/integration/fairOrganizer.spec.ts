import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("FairOrganizer", () => {
  it("/fair-organizer/:slug", () => {
    visitWithStatusRetries("fair-organizer/expo-chicago")
    cy.get("h1").should("contain", "Fair Organizer")
    cy.title().should("eq", "Fair Organizer | Artsy")
  })
})
