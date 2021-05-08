import React from "react"
import { Separator, FullBleed } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NavigationTabsFragmentContainer as NavigationTabs } from "v2/Apps/Partner/Components/NavigationTabs"
import { PartnerHeaderFragmentContainer as PartnerHeader } from "./Components/PartnerHeader"
import { PartnerApp_partner } from "v2/__generated__/PartnerApp_partner.graphql"
import { PartnerHeaderImageFragmentContainer as PartnerHeaderImage } from "./Components/PartnerHeader/PartnerHeaderImage"
import styled from "styled-components"
import { PartnerMetaFragmentContainer } from "./Components/PartnerMeta"
import { StickyProvider } from "v2/Components/Sticky"
import { AppContainer } from "../Components/AppContainer"
import { HorizontalPadding } from "../Components/HorizontalPadding"

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
  const { profile, isNonSubscriber } = partner

  return (
    <StickyProvider>
      {/* @ts-expect-error STRICT_NULL_CHECK */}
      <PartnerHeaderImage profile={profile} />

      <Foreground>
        <AppContainer>
          <HorizontalPadding>
            <PartnerMetaFragmentContainer partner={partner} />

            <PartnerHeader partner={partner} />

            <FullBleed mb={[2, 4]}>
              <Separator />
            </FullBleed>

            {!isNonSubscriber && <NavigationTabs partner={partner} />}

            {children}
          </HorizontalPadding>
        </AppContainer>
      </Foreground>
    </StickyProvider>
  )
}

export const PartnerAppFragmentContainer = createFragmentContainer(PartnerApp, {
  partner: graphql`
    fragment PartnerApp_partner on Partner {
      isNonSubscriber
      profile {
        ...PartnerHeaderImage_profile
      }
      ...PartnerMeta_partner
      ...PartnerHeader_partner
      ...NavigationTabs_partner
    }
  `,
})
