import { Box, Button, Link, Sans, Serif } from "@artsy/palette"
import React from "react"

interface Props {
  email: string
}

export const WrongOwner: React.FC<Props> = ({ email }) => {
  return (
    <Box
      px={[2, 3]}
      mb={6}
      mt={4}
      mx="auto"
      width={["100%", "80%"]}
      maxWidth="600px"
      textAlign="center"
    >
      <Serif size="6">Incorrect account</Serif>
      <Box textAlign="center">
        <Sans size="4" mt={2} weight="regular">
          You are currently logged in as {email}. To complete identity
          verification, please log out of this account, and log back into the
          account that received the email.
        </Sans>
        <Sans size="4" mt={2} weight="medium">
          For assistance, please contact Artsy verification support at{" "}
          <Link href="mailto:verification@artsy.net">
            verification@artsy.net
          </Link>
          .
        </Sans>
      </Box>
      <a href="mailto:verification@artsy.net">
        <Button block width={["100%", 335]} mt={4}>
          Contact support
        </Button>
      </a>
    </Box>
  )
}
