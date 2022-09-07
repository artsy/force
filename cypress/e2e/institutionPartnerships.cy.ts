/* eslint-disable jest/expect-expect */
import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

it("/institution-partnerships", () => {
  visitWithStatusRetries("institution-partnerships")
  cy.get("h1").should("contain", "Artsy for Museums")
  cy.title().should("eq", "Institution Partnerships | Artsy")
})
