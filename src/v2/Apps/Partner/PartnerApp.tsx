import * as React from "react"
import { Separator, FullBleed } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NavigationTabsFragmentContainer as NavigationTabs } from "v2/Apps/Partner/Components/NavigationTabs"
import { PartnerHeaderFragmentContainer as PartnerHeader } from "./Components/PartnerHeader"
import { PartnerApp_partner } from "v2/__generated__/PartnerApp_partner.graphql"
import { PartnerHeaderImageFragmentContainer as PartnerHeaderImage } from "./Components/PartnerHeader/PartnerHeaderImage"
import { PartnerMetaFragmentContainer } from "./Components/PartnerMeta"
import { StickyProvider } from "v2/Components/Sticky"
import { PartnerArtistsLoadingContextProvider } from "./Utils/PartnerArtistsLoadingContext"
import { HttpError } from "found"

export interface PartnerAppProps {
  partner: PartnerApp_partner
}

export const PartnerApp: React.FC<PartnerAppProps> = ({
  partner,
  children,
}) => {
  const {
    profile,
    partnerType,
    displayFullPartnerPage,
    isDefaultProfilePublic,
    partnerPageEligible,
  } = partner

  if (!isDefaultProfilePublic || !partnerPageEligible) {
    throw new HttpError(404)
  }

  return (
    <PartnerArtistsLoadingContextProvider>
      <StickyProvider>
        {profile && displayFullPartnerPage && (
          <PartnerHeaderImage profile={profile} />
        )}

        <PartnerMetaFragmentContainer partner={partner} />

        <PartnerHeader partner={partner} />

        <FullBleed mb={[2, 4]}>
          <Separator />
        </FullBleed>

        {(displayFullPartnerPage || partnerType === "Brand") && (
          <NavigationTabs partner={partner} />
        )}

        {children}
      </StickyProvider>
    </PartnerArtistsLoadingContextProvider>
  )
}

export const PartnerAppFragmentContainer = createFragmentContainer(PartnerApp, {
  partner: graphql`
    fragment PartnerApp_partner on Partner {
      partnerType
      displayFullPartnerPage
      partnerPageEligible
      isDefaultProfilePublic
      profile {
        ...PartnerHeaderImage_profile
      }
      ...PartnerMeta_partner
      ...PartnerHeader_partner
      ...NavigationTabs_partner
    }
  `,
})
