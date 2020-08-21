import { Link } from "@artsy/palette/dist/elements/Link"
import { Serif } from "@artsy/palette/dist/elements/Typography"
import { Button } from "@artsy/palette/dist/elements/Button"
import { Sans } from "@artsy/palette/dist/elements/Typography"
import { Box } from "@artsy/palette/dist/elements/Box"
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
