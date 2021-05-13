import { Box, Link, Text } from "@artsy/palette"
import React from "react"
import { Title as HeadTitle } from "react-head"

export const Error: React.FC = () => {
  return (
    <>
      <HeadTitle>Artsy | ID Verification</HeadTitle>

      <Box px={[2, 3]} mb={6} mt={4}>
        <Box mx="auto" width={[335, "80%"]} maxWidth="400px" textAlign="center">
          <Text variant="title" color="black100">
            Your verification has failed
          </Text>

          <Text variant="text" mt={2}>
            We were unable to complete your identity verification.
          </Text>

          <Text variant="mediumText" mt={2}>
            For assistance, please contact Artsy verification support at{" "}
            <Link href="mailto:verification@artsy.net">
              verification@artsy.net
            </Link>
            .
          </Text>
        </Box>
      </Box>
    </>
  )
}
