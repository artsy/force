import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Alerts", () => {
  it("/user/alerts - all alerts", () => {
    visitWithStatusRetries("user/alerts")
    cy.title().should("eq", "Saved Alerts | Artsy")
  })
})
