import { AboutPartnerFragmentContainer } from "Apps/Partner/Components/Overview/AboutPartner"
import { ArticlesRailFragmentContainer } from "Apps/Partner/Components/Overview/ArticlesRail"
import { ArtistsRailFragmentContainer } from "Apps/Partner/Components/Overview/ArtistsRail"
import { ArtworksRailRenderer } from "Apps/Partner/Components/Overview/ArtworksRail"
import { NearbyGalleriesRailRenderer } from "Apps/Partner/Components/Overview/NearbyGalleriesRail"
import { ShowBannersRailRenderer } from "Apps/Partner/Components/Overview/ShowBannersRail/ShowBannersRail"
import { ShowsRailFragmentContainer } from "Apps/Partner/Components/Overview/ShowsRail"
import { SubscriberBannerFragmentContainer } from "Apps/Partner/Components/Overview/SubscriberBanner"
import type { Overview_partner$data } from "__generated__/Overview_partner.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface OverviewProps {
  partner: Overview_partner$data
}

const Overview: React.FC<React.PropsWithChildren<OverviewProps>> = ({
  partner,
}) => {
  const {
    slug,
    partnerType,
    displayFullPartnerPage,
    profileBannerDisplay,
    displayArtistsSection,
    locationsConnection,
  } = partner

  const location = locationsConnection?.edges?.[0]?.node

  return displayFullPartnerPage ? (
    <>
      {profileBannerDisplay === "Artworks" ? (
        <ArtworksRailRenderer mt={4} mb={[4, 12]} partnerId={slug} />
      ) : (
        <ShowBannersRailRenderer mt={4} mb={[4, 12]} partnerId={slug} />
      )}

      <AboutPartnerFragmentContainer partner={partner} />

      <ShowsRailFragmentContainer mt={4} mb={[4, 12]} partner={partner} />

      {displayArtistsSection && (
        <ArtistsRailFragmentContainer mt={4} mb={[4, 12]} partner={partner} />
      )}

      <ArticlesRailFragmentContainer partner={partner} />
    </>
  ) : (
    <>
      {partnerType !== "Brand" && (
        <SubscriberBannerFragmentContainer partner={partner} />
      )}

      <AboutPartnerFragmentContainer partner={partner} />

      {location && location.coordinates && (
        <NearbyGalleriesRailRenderer
          mt={[4, 6]}
          near={`${location.coordinates.lat},${location.coordinates.lng}`}
        />
      )}
    </>
  )
}

export const OverviewFragmentContainer = createFragmentContainer(Overview, {
  partner: graphql`
    fragment Overview_partner on Partner {
      slug
      partnerType
      displayFullPartnerPage
      profileBannerDisplay
      displayArtistsSection
      ...AboutPartner_partner
      ...ShowsRail_partner
      ...ArtistsRail_partner
      ...SubscriberBanner_partner
      ...ArticlesRail_partner
      locationsConnection(first: 1) {
        edges {
          node {
            coordinates {
              lat
              lng
            }
          }
        }
      }
    }
  `,
})
