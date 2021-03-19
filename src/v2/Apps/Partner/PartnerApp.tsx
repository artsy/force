import React from "react"
import { Box, Text } from "@artsy/palette"
import { Footer } from "v2/Components/Footer"
import { AppContainer } from "../Components/AppContainer"
import { HorizontalPadding } from "../Components/HorizontalPadding"
import { NavigationTabsFragmentContainer as NavigationTabs } from "v2/Apps/Partner/Components/NavigationTabs"
import { createFragmentContainer, graphql } from "react-relay"
import { PartnerApp_partner } from "v2/__generated__/PartnerApp_partner.graphql"

export interface PartnerAppProps {
  partner: PartnerApp_partner
}

export const PartnerApp: React.FC<PartnerAppProps> = ({
  partner,
  children,
}) => {
  return (
    <AppContainer>
      <Box mx={[2, 4]}>
        <Text pt={2} pb={1} variant="largeTitle">
          {partner.name}
        </Text>

        <NavigationTabs partner={partner} />

        {children}
      </Box>

      <HorizontalPadding mt={4} mb={8}>
        <Footer />
      </HorizontalPadding>
    </AppContainer>
  )
}

export const PartnerAppFragmentContainer = createFragmentContainer(PartnerApp, {
  partner: graphql`
    fragment PartnerApp_partner on Partner {
      name
      ...NavigationTabs_partner
    }
  `,
})
