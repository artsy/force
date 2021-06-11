import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Fair", () => {
  it("/fair/:fair_id", () => {
    visitWithStatusRetries("fair/expo-chicago-2019")
    cy.get("h1").should("contain", "EXPO CHICAGO 2019")
    cy.title().should("eq", "EXPO CHICAGO 2019 | Artsy")
  })
})
