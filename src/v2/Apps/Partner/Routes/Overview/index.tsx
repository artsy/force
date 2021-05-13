import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticlesRailFragmentContainer } from "../../Components/Overview/ArticlesRail"
import { Overview_partner } from "v2/__generated__/Overview_partner.graphql"
import { ArtistsRailFragmentContainer } from "../../Components/Overview/ArtistsRail"
import { ShowsRailFragmentContainer } from "../../Components/Overview/ShowsRail"
import { AboutPartnerFragmentContainer } from "../../Components/Overview/AboutPartner"
import { ArtworksRailRenderer } from "../../Components/Overview/ArtworksRail"
import { ShowBannersRailRenderer } from "../../Components/Overview/ShowBannersRail"

interface OverviewProps {
  partner: Overview_partner
}

const Overview: React.FC<OverviewProps> = ({ partner }) => {
  const {
    slug,
    fullProfileEligible,
    profileBannerDisplay,
    displayArtistsSection,
    // @ts-expect-error STRICT_NULL_CHECK
    articlesConnection: { edges: articles },
  } = partner

  const hasArticles = articles.length > 0

  return fullProfileEligible ? (
    <>
      {profileBannerDisplay === "Artworks" ? (
        <ArtworksRailRenderer mt={4} mb={[4, 80]} partnerId={slug} />
      ) : (
        <ShowBannersRailRenderer mt={4} mb={[4, 80]} partnerId={slug} />
      )}

      <AboutPartnerFragmentContainer partner={partner} />

      <ShowsRailFragmentContainer mt={4} mb={[4, 80]} partner={partner} />
      {displayArtistsSection && (
        <ArtistsRailFragmentContainer partner={partner} />
      )}
      {hasArticles && (
        <ArticlesRailFragmentContainer partnerSlug={slug} articles={articles} />
      )}
    </>
  ) : (
    <>
      <AboutPartnerFragmentContainer partner={partner} />

      <ShowsRailFragmentContainer mt={4} mb={[4, 80]} partner={partner} />

      {displayArtistsSection && (
        <ArtistsRailFragmentContainer partner={partner} />
      )}
    </>
  )
}

export const OverviewFragmentContainer = createFragmentContainer(Overview, {
  partner: graphql`
    fragment Overview_partner on Partner {
      slug
      fullProfileEligible
      profileBannerDisplay
      displayArtistsSection
      ...AboutPartner_partner
      ...ShowsRail_partner
      ...ArtistsRail_partner
      articlesConnection(first: 8)
        @connection(key: "ArticlesQuery_articlesConnection") {
        totalCount
        edges {
          ...ArticlesRail_articles
        }
      }
    }
  `,
})
