import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Fairs", () => {
  it("/fairs", () => {
    visitWithStatusRetries("art-fairs")
    cy.contains("Past Events").should("exist")
    cy.title().should("eq", "Preview 60+ Top Art Fairs on Artsy | Artsy")
  })
})
