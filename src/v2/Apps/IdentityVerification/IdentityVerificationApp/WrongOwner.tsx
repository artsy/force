import { Button, Spacer, Message, Text } from "@artsy/palette"
import * as React from "react"

interface Props {
  email: string
}

export const WrongOwner: React.FC<Props> = ({ email }) => {
  return (
    <>
      <Text variant="xl">Incorrect account</Text>

      <Spacer mt={2} />

      <Message
        variant="warning"
        title={`You are currently logged in as ${email}.`}
      >
        To complete identity verification, please log out of this account, and
        log back into the account that received the email. For assistance,
        please contact Artsy verification support at{" "}
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
