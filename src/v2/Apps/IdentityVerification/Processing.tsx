import { Box, Button, Sans, Serif } from "@artsy/palette"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import React from "react"
import { Title as HeadTitle } from "react-head"

export const Processing: React.FC = () => {
  return (
    <AppContainer>
      <HeadTitle>Artsy | ID Verification</HeadTitle>

      <Box px={[2, 3]} mb={6} mt={4}>
        <Box mx="auto" width={[335, "80%"]} maxWidth="400px" textAlign="center">
          <Serif size="6" color="black100">
            Your verification is processing
          </Serif>

          <Sans size="4" color="black100" mt={2}>
            Thank you for completing identity verification. Your verification is
            processing and may take up to 5 minutes to complete.
          </Sans>
          <Sans size="4" color="black100" mt={2}>
            In the meantime, you can still browse on Artsy.
          </Sans>
          <RouterLink to="/">
            <Button block width="100%" mt={2}>
              Return home
            </Button>
          </RouterLink>
        </Box>
      </Box>
    </AppContainer>
  )
}

export default Processing
