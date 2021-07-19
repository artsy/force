import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

describe("Home", () => {
  it("/", () => {
    visitWithStatusRetries("/")
    cy.get("h1").should(
      "contain",
      "Collect art from leading galleries, fairs, and auctions"
    )
  })
})
