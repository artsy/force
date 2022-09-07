import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Viewing rooms", () => {
  it("/viewing-rooms", () => {
    visitWithStatusRetries("viewing-rooms")
    cy.get("h1").should("contain", "Viewing Rooms")
    cy.title().should("eq", "Artsy Viewing Rooms")

    // follow link to viewing room
    const roomLink = cy.get('a[href*="/viewing-room/"]:first')
    roomLink.click()
    cy.url().should("contain", "/viewing-room/")
    cy.contains("Works")
  })
})
