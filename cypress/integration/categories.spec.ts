/* eslint-disable jest/expect-expect */
import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("/categories", () => {
  it("renders page content", () => {
    visitWithStatusRetries("categories")
    cy.get("h1").should("contain", "The Art Genome Project")
  })
})
