import React from "react"
import { Separator } from "@artsy/palette"
import { AppContainer } from "../Components/AppContainer"
import { HorizontalPadding } from "../Components/HorizontalPadding"
import { createFragmentContainer, graphql } from "react-relay"
import { NavigationTabsFragmentContainer as NavigationTabs } from "v2/Apps/Partner/Components/NavigationTabs"
import { PartnerHeaderFragmentContainer as PartnerHeader } from "./Components/PartnerHeader"
import { PartnerApp_partner } from "v2/__generated__/PartnerApp_partner.graphql"
import { FullBleed } from "v2/Components/FullBleed"
import { PartnerHeaderImageFragmentContainer as PartnerHeaderImage } from "./Components/PartnerHeader/PartnerHeaderImage"
import styled from "styled-components"

export interface PartnerAppProps {
  partner: PartnerApp_partner
}

const Foreground = styled(FullBleed)`
  background-color: white;
  z-index: 1;
  display: flex;
`

export const PartnerApp: React.FC<PartnerAppProps> = ({
  partner,
  children,
}) => {
  return (
    <>
      <PartnerHeaderImage profile={partner.profile} />

      <Foreground>
        <AppContainer>
          <HorizontalPadding>
            <PartnerHeader partner={partner} />

            <FullBleed mb={[2, 4]}>
              <Separator />
            </FullBleed>

            <NavigationTabs partner={partner} />

            {children}
          </HorizontalPadding>
        </AppContainer>
      </Foreground>
    </>
  )
}

export const PartnerAppFragmentContainer = createFragmentContainer(PartnerApp, {
  partner: graphql`
    fragment PartnerApp_partner on Partner {
      profile {
        ...PartnerHeaderImage_profile
      }
      ...PartnerHeader_partner
      ...NavigationTabs_partner
    }
  `,
})
