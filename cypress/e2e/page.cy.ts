import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Page", () => {
  it("/page/:id", () => {
    visitWithStatusRetries("page/terms")
    cy.title().should("contain", "Terms")
  })
})
