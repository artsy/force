import { Button, Text, Spacer, Message } from "@artsy/palette"
import * as React from "react"
import { RouterLink } from "System/Components/RouterLink"

export const CompletePassed: React.FC = () => {
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
        // @ts-ignore
        as={RouterLink}
        to="/"
        width="100%"
      >
        Finish
      </Button>
    </>
  )
}
