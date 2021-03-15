import React from "react"
import { Box, Text } from "@artsy/palette"
import { Footer } from "v2/Components/Footer"
import { AppContainer } from "../Components/AppContainer"
import { HorizontalPadding } from "../Components/HorizontalPadding"
import { NavigationTabs } from "./Components/NavigationTabs"
import { Match } from "found"

export interface PartnerAppProps {
  match: Match
}

export const PartnerApp: React.FC<PartnerAppProps> = props => {
  return (
    <AppContainer>
      <Box mx={[2, 4]}>
        <Text pt={2} pb={1} variant="largeTitle">
          Partner: {props.match.params.partnerId}
        </Text>

        <NavigationTabs partnerId={props.match.params.partnerId} />

        {props.children}
      </Box>

      <HorizontalPadding mt={4} mb={8}>
        <Footer />
      </HorizontalPadding>
    </AppContainer>
  )
}
