import { Button, Message, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type * as React from "react"

export const CompleteFailed: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <>
      <Text variant="xl">Identity verification failed</Text>

      <Spacer y={2} />

      <Message
        variant="error"
        title="We’re sorry, we were not able to verify your identity."
      >
        For assistance, please contact Artsy verification support at{" "}
        <RouterLink inline to="mailto:verification@artsy.net">
          verification@artsy.net
        </RouterLink>
        .
      </Message>

      <Spacer y={2} />

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
