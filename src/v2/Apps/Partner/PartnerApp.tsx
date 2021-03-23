import React from "react"
import { Box, Separator } from "@artsy/palette"
import { Footer } from "v2/Components/Footer"
import { AppContainer } from "../Components/AppContainer"
import { HorizontalPadding } from "../Components/HorizontalPadding"
import { createFragmentContainer, graphql } from "react-relay"
import { NavigationTabsFragmentContainer as NavigationTabs } from "v2/Apps/Partner/Components/NavigationTabs"
import { PartnerHeaderFragmentContainer as PartnerHeader } from "./Components/PartnerHeader"
import { PartnerApp_partner } from "v2/__generated__/PartnerApp_partner.graphql"
import { FullBleed } from "v2/Components/FullBleed"

export interface PartnerAppProps {
  partner: PartnerApp_partner
}

export const PartnerApp: React.FC<PartnerAppProps> = ({
  partner,
  children,
}) => {
  return (
    <AppContainer>
      <HorizontalPadding mt={[2, 4]}>
        <PartnerHeader partner={partner} />

        <FullBleed>
          <Separator />
        </FullBleed>

        <Box py={2} mt={[2, 4]}>
          <NavigationTabs partner={partner} />
        </Box>

        {children}

        <Footer />
      </HorizontalPadding>
    </AppContainer>
  )
}

export const PartnerAppFragmentContainer = createFragmentContainer(PartnerApp, {
  partner: graphql`
    fragment PartnerApp_partner on Partner {
      ...PartnerHeader_partner
      ...NavigationTabs_partner
    }
  `,
})
