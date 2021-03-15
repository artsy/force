import React from "react"
import { Box, Text } from "@artsy/palette"
import { Footer } from "v2/Components/Footer"
import { AppContainer } from "../Components/AppContainer"
import { HorizontalPadding } from "../Components/HorizontalPadding"

export const PartnerApp: React.FC<any> = props => {
  return (
    <AppContainer>
      <Box mx={[2, 4]}>
        <Text pt={2} pb={1} variant="largeTitle">
          Partner: {props.match.params.partnerId}
        </Text>
      </Box>

      <HorizontalPadding mt={4} mb={8}>
        <Footer />
      </HorizontalPadding>
    </AppContainer>
  )
}
