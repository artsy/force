import { Serif } from "@artsy/palette"
import React from "react"

export const CreditCardInstructions = () => {
  return (
    <>
      <Serif size="4" color="black100">
        Please enter your credit card information below. The name on your Artsy
        account must match the name on the card, and a valid credit card is
        required in order to bid.
      </Serif>
      <Serif size="4" mt={2} color="black100">
        Registration is free. Artsy will never charge this card without your
        permission, and you are not required to use this card to pay if you win.
      </Serif>
    </>
  )
}
