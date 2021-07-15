import { visitWithStatusRetries } from "../helpers/visitWithStatusRetries"

// FIXME: These pass locally but not on CI
describe.skip("flash_message", () => {
  it("renders the email confirmed banner when ?flash_message is confirmed", () => {
    visitWithStatusRetries("/?flash_message=confirmed")

    cy.get("[data-test='flashMessage']").should(
      "contain",
      "Your email has been confirmed"
    )
  })

  it("ignores flash messages that aren't explicitly supported", () => {
    visitWithStatusRetries("/?flash_message=l33thaxor")

    cy.get("[data-test='flashMessage']").should("not.contain", "l33thaxor")
  })
})
