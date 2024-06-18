import { Button, Message, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import * as React from "react"

export const CompleteWatchlistHit: React.FC = () => {
  return (
    <>
      <Text variant="xl">Artsy is reviewing your identity verification</Text>

      <Spacer y={2} />

      <Message
        variant="info"
        title="Thank you for completing identity verification."
      >
        We are reviewing your verification result and will update you as soon as
        possible. In the meantime, you can still browse works on Artsy.
      </Message>

      <Spacer y={2} />

      <Button
        // @ts-ignore
        as={RouterLink}
        to="/"
        width="100%"
      >
        Return home
      </Button>
    </>
  )
}
