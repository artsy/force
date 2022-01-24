import { createFragmentContainer, graphql } from "react-relay"
import { ArticlesRailFragmentContainer } from "../../Components/Overview/ArticlesRail"
import { Overview_partner } from "v2/__generated__/Overview_partner.graphql"
import { ArtistsRailFragmentContainer } from "../../Components/Overview/ArtistsRail"
import { ShowsRailFragmentContainer } from "../../Components/Overview/ShowsRail"
import { AboutPartnerFragmentContainer } from "../../Components/Overview/AboutPartner"
import { SubscriberBannerFragmentContainer } from "../../Components/Overview/SubscriberBanner"
import { ArtworksRailRenderer } from "../../Components/Overview/ArtworksRail"
import { ShowBannersRailRenderer } from "../../Components/Overview/ShowBannersRail"
import { NearbyGalleriesRailRenderer } from "../../Components/Overview/NearbyGalleriesRail"

interface OverviewProps {
  partner: Overview_partner
}

const Overview: React.FC<OverviewProps> = ({ partner }) => {
  const {
    slug,
    partnerType,
    displayFullPartnerPage,
    profileBannerDisplay,
    displayArtistsSection,
    locationsConnection,
  } = partner

  const location = locationsConnection?.edges![0]?.node

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

      <ShowsRailFragmentContainer mt={4} mb={[4, 12]} partner={partner} />

      {displayArtistsSection && (
        <ArtistsRailFragmentContainer mt={4} mb={[4, 12]} partner={partner} />
      )}

      {location && location.coordinates && (
        <NearbyGalleriesRailRenderer
          mt={[4, 6]}
          near={`${location.coordinates.lat},${location.coordinates.lng}`}
          city={location.city}
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
            city
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
