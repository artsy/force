import { Box, Button, Link, Sans, Serif } from "@artsy/palette"
import React from "react"

export const CompletePassed: React.FC = () => {
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
      <Serif size="6">Identity verification complete</Serif>
      <Box textAlign="center">
        <Sans size="4" mt={2} weight="medium">
          Your identity was successfully verified.
        </Sans>
        <Sans size="4" mt={2} weight="medium">
          Thank you for completing identity verification.
        </Sans>
      </Box>
      <Link href="https://artsy.net">
        <Button block width={["100%", 335]} mt={4}>
          Finish
        </Button>
      </Link>
    </Box>
  )
}
