import React from "react"
import { Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticlesRailFragmentContainer } from "../../Components/Overview/ArticlesRail"
import { Overview_partner } from "v2/__generated__/Overview_partner.graphql"
import { ArtistsRailFragmentContainer } from "../../Components/Overview/ArtistsRail"
import { ShowsRailFragmentContainer } from "../../Components/Overview/ShowsRail"
import { ArtworksRailRenderer } from "../../Components/Overview/ArtworksRail"

interface OverviewProps {
  partner: Overview_partner
}

const Overview: React.FC<OverviewProps> = ({ partner }) => {
  const {
    articlesConnection: { edges: articles },
    displayArtistsSection,
    profileBannerDisplay,
  } = partner

  const hasArticles = articles.length > 0

  return (
    <Box>
      {profileBannerDisplay === "Artworks" && (
        <ArtworksRailRenderer mt={4} mb={[4, 80]} partnerId={partner.slug} />
      )}
      <ShowsRailFragmentContainer mt={4} mb={[4, 80]} partner={partner} />
      {displayArtistsSection && (
        <ArtistsRailFragmentContainer partner={partner} />
      )}
      {hasArticles && (
        <ArticlesRailFragmentContainer
          partnerSlug={partner.slug}
          articles={articles}
        />
      )}
    </Box>
  )
}

export const OverviewFragmentContainer = createFragmentContainer(Overview, {
  partner: graphql`
    fragment Overview_partner on Partner {
      slug
      profileBannerDisplay
      displayArtistsSection
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
