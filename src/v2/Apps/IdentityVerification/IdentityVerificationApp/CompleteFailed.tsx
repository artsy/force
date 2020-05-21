import { Box, Button, Link, Sans, Serif } from "@artsy/palette"
import React from "react"

export const CompleteFailed: React.FC = () => {
  return (
    <Box
      px={[2, 3]}
      mb={6}
      mt={4}
      mx="auto"
      width={["100%", "80%"]}
      maxWidth="400px"
      textAlign="center"
    >
      <Serif size="6">Identity verification failed</Serif>
      <Box textAlign="center">
        <Sans size="4" mt={2} weight="medium">
          We're sorry, we were not able to verify your identity.
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
