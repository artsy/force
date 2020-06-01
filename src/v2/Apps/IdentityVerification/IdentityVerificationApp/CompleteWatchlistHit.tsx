import { Box, Button, Sans, Serif } from "@artsy/palette"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import React from "react"
import { Title as HeadTitle } from "react-head"

export const CompleteWatchlistHit: React.FC = () => {
  return (
    <AppContainer>
      <HeadTitle>Artsy | ID Verification</HeadTitle>

      <Box
        px={[2, 3]}
        mb={6}
        mt={4}
        mx="auto"
        width={[335, "80%"]}
        maxWidth="400px"
        textAlign="center"
      >
        <Serif size="6" color="black100">
          Artsy is reviewing your identity verification
        </Serif>

        <Sans size="4" color="black100" mt={2}>
          Thank you for completing identity verification. We are reviewing your
          verification result and will update you as soon as possible.
        </Sans>
        <Sans size="4" color="black100" mt={2}>
          In the meantime, you can still browse works on Artsy.
        </Sans>
        <RouterLink to="/">
          <Button block width="100%" mt={2}>
            Return home
          </Button>
        </RouterLink>
      </Box>
    </AppContainer>
  )
}
