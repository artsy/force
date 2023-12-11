import { createFragmentContainer, graphql } from "react-relay"
import { ArticlesRailFragmentContainer } from "Apps/Partner/Components/Overview/ArticlesRail"
import { Overview_partner$data } from "__generated__/Overview_partner.graphql"
import { ArtistsRailFragmentContainer } from "Apps/Partner/Components/Overview/ArtistsRail"
import { ShowsRailFragmentContainer } from "Apps/Partner/Components/Overview/ShowsRail"
import { AboutPartnerFragmentContainer } from "Apps/Partner/Components/Overview/AboutPartner"
import { SubscriberBannerFragmentContainer } from "Apps/Partner/Components/Overview/SubscriberBanner"
import { ArtworksRailRenderer } from "Apps/Partner/Components/Overview/ArtworksRail"
import { ShowBannersRailRenderer } from "Apps/Partner/Components/Overview/ShowBannersRail/ShowBannersRail"

interface OverviewProps {
  partner: Overview_partner$data
}

const Overview: React.FC<OverviewProps> = ({ partner }) => {
  const {
    slug,
    partnerType,
    displayFullPartnerPage,
    profileBannerDisplay,
    displayArtistsSection,
  } = partner

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
    }
  `,
})
