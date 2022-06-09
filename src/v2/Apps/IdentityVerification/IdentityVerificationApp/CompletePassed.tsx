import { Button, Text, Spacer, Message } from "@artsy/palette"
import * as React from "react"
import { RouterLink } from "v2/System/Router/RouterLink"

export const CompletePassed: React.FC = () => {
  return (
    <>
      <Text variant="xl">Identity verification complete</Text>

      <Spacer mt={2} />

      <Message
        variant="success"
        title="Your identity was successfully verified."
      >
        Thank you for completing identity verification.
      </Message>

      <Spacer mt={2} />

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
