/* eslint-disable jest/expect-expect */
import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Shows", () => {
  it("/shows", () => {
    visitWithStatusRetries("shows2")
    cy.get("h1").should("contain", "Featured Shows")
  })
})
