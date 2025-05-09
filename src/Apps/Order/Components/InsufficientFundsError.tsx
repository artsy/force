import { Message, Spacer, Text } from "@artsy/palette"
import type { FC } from "react"

export const InsufficientFundsError: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <>
      <Spacer y={2} />
      <Message
        title="This bank account doesn’t have enough funds."
        variant="error"
      >
        <Text variant="sm">
          Please choose or link to another bank account or select another
          payment method.
        </Text>
      </Message>
      <Spacer y={2} />
    </>
  )
}
