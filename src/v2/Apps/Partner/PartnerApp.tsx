import React from "react"
import { Separator, FullBleed, Box, Flex } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NavigationTabsFragmentContainer as NavigationTabs } from "v2/Apps/Partner/Components/NavigationTabs"
import { PartnerHeaderFragmentContainer as PartnerHeader } from "./Components/PartnerHeader"
import { PartnerApp_partner } from "v2/__generated__/PartnerApp_partner.graphql"
import { PartnerHeaderImageFragmentContainer as PartnerHeaderImage } from "./Components/PartnerHeader/PartnerHeaderImage"
import styled from "styled-components"
import { PartnerMetaFragmentContainer } from "./Components/PartnerMeta"
import { PartnerArtistsLoadingContextProvider } from "./Utils/PartnerArtistsLoadingContext"

export interface PartnerAppProps {
  partner: PartnerApp_partner
}

const Foreground = styled(FullBleed)`
  background-color: white;
  z-index: 0;
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
`

export const PartnerApp: React.FC<PartnerAppProps> = ({
  partner,
  children,
}) => {
  const { profile, fullProfileEligible } = partner

  return (
    <PartnerArtistsLoadingContextProvider>
      {profile && <PartnerHeaderImage profile={profile} />}

      <Flex position="relative" flexDirection="column">
        <Foreground />
        <Box zIndex={1} position="relative">
          <PartnerMetaFragmentContainer partner={partner} />

          <PartnerHeader partner={partner} />

          <FullBleed mb={[2, 4]}>
            <Separator />
          </FullBleed>

          {fullProfileEligible && <NavigationTabs partner={partner} />}

          {children}
        </Box>
      </Flex>
    </PartnerArtistsLoadingContextProvider>
  )
}

export const PartnerAppFragmentContainer = createFragmentContainer(PartnerApp, {
  partner: graphql`
    fragment PartnerApp_partner on Partner {
      fullProfileEligible
      profile {
        ...PartnerHeaderImage_profile
      }
      ...PartnerMeta_partner
      ...PartnerHeader_partner
      ...NavigationTabs_partner
    }
  `,
})
