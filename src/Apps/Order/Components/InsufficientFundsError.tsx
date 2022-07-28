import { FC } from "react"
import { Spacer, Message, Text } from "@artsy/palette"

export const InsufficientFundsError: FC = () => {
  return (
    <>
      <Spacer mt={4} />
      <Message
        title="This bank account doesn’t have enough funds."
        variant="error"
      >
        <Text variant="sm">
          Please choose or link to another bank account or select another
          payment method.
        </Text>
      </Message>
    </>
  )
}
