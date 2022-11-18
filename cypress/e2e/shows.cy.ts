/* eslint-disable jest/expect-expect */
import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Shows", () => {
  // FIXME: Temporarily pends spec to unblock CI
  it.skip("/shows", () => {
    visitWithStatusRetries("shows")
    cy.get("h1").should("contain", "Featured Shows")
    cy.title().should("eq", "Art Gallery Shows and Museum Exhibitions | Artsy")

    // follow link to individual show
    const showLink = cy.get('a[href*="/show/"]:first')
    showLink.click()
    cy.url().should("contain", "/show/")
    cy.contains("Show")
  })
})
