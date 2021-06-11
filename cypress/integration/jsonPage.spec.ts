import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

// TODO: Currently throws an error. Likely needs an additional ENV var.
describe.skip("JSON Page", () => {
  it("/:slug", () => {
    visitWithStatusRetries("armory-week")
    cy.get("#react-root").should("contain.text", "Armory Week")
    cy.title().should(
      "eq",
      "The Armory Show and more on Artsy | Armory Week 2019"
    )
  })
})
