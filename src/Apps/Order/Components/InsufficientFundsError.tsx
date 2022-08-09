import { FC } from "react"
import { Message, Text } from "@artsy/palette"

export const InsufficientFundsError: FC = () => {
  return (
    <>
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
