import { errorMessageForCard } from "../errorMessages"

describe("errorMessageForCard", () => {
  it("appends a message for a declined card", () => {
    expect(errorMessageForCard("Your card was declined.")).toEqual(
      "Your card was declined. Please contact your bank or use a different card."
    )
  })

  it("appends a message for a card with insufficient funds", () => {
    expect(errorMessageForCard("Your card has insufficient funds.")).toEqual(
      "Your card has insufficient funds. Please contact your bank or use a different card."
    )
  })

  it("appends a message for an expired card", () => {
    expect(errorMessageForCard("Your card has expired.")).toEqual(
      "Your card has expired. Please contact your bank or use a different card."
    )
  })

  it("appends a message for a submission with an invalid security code", () => {
    expect(
      errorMessageForCard("Your card's security code is incorrect.")
    ).toEqual("Your card's security code is incorrect. Please try again.")
  })

  it("does not modify the message for any other types of error", () => {
    expect(
      errorMessageForCard(
        "An error occurred while processing your card. Try again in a little bit."
      )
    ).toEqual(
      "An error occurred while processing your card. Try again in a little bit. "
    )
  })
})
