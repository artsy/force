import { RouterLink } from "System/Components/RouterLink"
import { Button, Message, Spacer, Text } from "@artsy/palette"
import type * as React from "react"

export const CompletePassed: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <>
      <Text variant="xl">Identity verification complete</Text>

      <Spacer y={2} />

      <Message
        variant="success"
        title="Your identity was successfully verified."
      >
        Thank you for completing identity verification.
      </Message>

      <Spacer y={2} />

      <Button
        // @ts-expect-error
        as={RouterLink}
        to="/"
        width="100%"
      >
        Finish
      </Button>
    </>
  )
}
