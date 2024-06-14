import * as React from "react"
import { Separator, FullBleed, Marquee } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NavigationTabsFragmentContainer as NavigationTabs } from "Apps/Partner/Components/NavigationTabs"
import { PartnerHeaderFragmentContainer as PartnerHeader } from "./Components/PartnerHeader"
import { PartnerApp_partner$data } from "__generated__/PartnerApp_partner.graphql"
import { PartnerHeaderImageFragmentContainer as PartnerHeaderImage } from "./Components/PartnerHeader/PartnerHeaderImage"
import { PartnerMetaFragmentContainer } from "./Components/PartnerMeta"
import { PartnerArtistsLoadingContextProvider } from "./Utils/PartnerArtistsLoadingContext"
import { HttpError } from "found"
import { Analytics } from "System/Contexts/AnalyticsContext"

export interface PartnerAppProps {
  partner: PartnerApp_partner$data
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
    categories,
  } = partner

  if (!isDefaultProfilePublic || !partnerPageEligible) {
    throw new HttpError(404)
  }

  const galleryBadges = ["Black Owned", "Women Owned"]

  const eligibleCategories = (categories || []).filter(Boolean)
  const categoryNames: string[] = eligibleCategories.map(
    category => category?.name || ""
  )
  const firstEligibleBadgeName: string | undefined = galleryBadges.find(badge =>
    categoryNames.includes(badge)
  )

  return (
    <Analytics contextPageOwnerId={partner.internalID}>
      <PartnerArtistsLoadingContextProvider>
        {profile && displayFullPartnerPage && (
          <PartnerHeaderImage profile={profile} />
        )}

        <PartnerMetaFragmentContainer partner={partner} />

        <PartnerHeader partner={partner} />

        <FullBleed mb={[2, 4]}>
          {firstEligibleBadgeName ? (
            <Marquee
              speed="static"
              marqueeText={firstEligibleBadgeName.replace(" ", "-")} // hypenate gallery badges
            />
          ) : (
            <Separator />
          )}
        </FullBleed>

        {(displayFullPartnerPage || partnerType === "Brand") && (
          <NavigationTabs partner={partner} />
        )}

        {children}
      </PartnerArtistsLoadingContextProvider>
    </Analytics>
  )
}

export const PartnerAppFragmentContainer = createFragmentContainer(PartnerApp, {
  partner: graphql`
    fragment PartnerApp_partner on Partner {
      internalID
      partnerType
      displayFullPartnerPage
      partnerPageEligible
      isDefaultProfilePublic
      categories {
        id
        name
      }
      profile {
        ...PartnerHeaderImage_profile
      }
      ...PartnerMeta_partner
      ...PartnerHeader_partner
      ...NavigationTabs_partner
    }
  `,
})
