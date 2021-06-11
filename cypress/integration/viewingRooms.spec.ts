import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Viewing rooms", () => {
  it("/viewing-rooms", () => {
    visitWithStatusRetries("viewing-rooms")
    cy.get("h1").should("contain", "Viewing Rooms")
    cy.title().should("eq", "Artsy Viewing Rooms")
  })
})
