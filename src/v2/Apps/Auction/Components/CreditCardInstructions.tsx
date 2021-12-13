import { Text } from "@artsy/palette"

export const CreditCardInstructions = () => {
  return (
    <>
      <Text variant="md">
        Please enter your credit card information below. The name on your Artsy
        account must match the name on the card, and a valid credit card is
        required in order to bid.
      </Text>
      <Text variant="md" mt={2}>
        Registration is free. Artsy will never charge this card without your
        permission, and you are not required to use this card to pay if you win.
      </Text>
    </>
  )
}
