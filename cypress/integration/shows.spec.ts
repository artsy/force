/* eslint-disable jest/expect-expect */
import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Shows", () => {
  it("/shows", () => {
    visitWithStatusRetries("shows2")
    cy.get("h1").should("contain", "Featured Shows")
    cy.title().should("eq", "Art Gallery Shows and Museum Exhibitions | Artsy")
  })
})
