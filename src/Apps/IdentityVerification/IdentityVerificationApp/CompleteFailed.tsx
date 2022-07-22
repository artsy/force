import { Button, Message, Spacer, Text } from "@artsy/palette"
import * as React from "react"

export const CompleteFailed: React.FC = () => {
  return (
    <>
      <Text variant="xl">Identity verification failed</Text>

      <Spacer mt={2} />

      <Message
        variant="error"
        title="We’re sorry, we were not able to verify your identity."
      >
        For assistance, please contact Artsy verification support at{" "}
        <a href="mailto:verification@artsy.net">verification@artsy.net</a>.
      </Message>

      <Spacer mt={2} />

      <Button
        width="100%"
        // @ts-ignore
        as="a"
        href="mailto:verification@artsy.net"
      >
        Contact support
      </Button>
    </>
  )
}
