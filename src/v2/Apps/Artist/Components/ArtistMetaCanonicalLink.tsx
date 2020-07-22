import React from "react"
import { Link } from "react-head"
import { data as sd } from "sharify"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistMetaCanonicalLink_artist } from "v2/__generated__/ArtistMetaCanonicalLink_artist.graphql"
import { hasSections as showMarketInsights } from "v2/Apps/Artist/Components/MarketInsights/MarketInsights"
import { hasOverviewContent } from "v2/Apps/Artist/Components/NavigationTabs"

export const canonicalPath = (artist: ArtistMetaCanonicalLink_artist) => {
  const hasArtistInsights =
    showMarketInsights(artist) ||
    (artist.insights && artist.insights.length > 0)

  const hasArtistContent = hasOverviewContent(artist)
  const canShowOverview = hasArtistInsights || hasArtistContent

  return canShowOverview
    ? `/artist/${artist.slug}`
    : `/artist/${artist.slug}/works-for-sale`
}

export type ArtistMetaCanonicalLinkProps = {
  artist: ArtistMetaCanonicalLink_artist
}

export const ArtistMetaCanonicalLink: React.FC<ArtistMetaCanonicalLinkProps> = ({
  artist,
}) => {
  return <Link rel="canonical" href={`${sd.APP_URL}${canonicalPath(artist)}`} />
}

export const ArtistMetaCanonicalLinkFragmentContainer = createFragmentContainer(
  ArtistMetaCanonicalLink,
  {
    artist: graphql`
      fragment ArtistMetaCanonicalLink_artist on Artist
        @argumentDefinitions(
          partnerCategory: {
            type: "[String]"
            defaultValue: ["blue-chip", "top-established", "top-emerging"]
          }
        ) {
        slug
        statuses {
          shows
          cv(minShowCount: 0)
          articles
          auctionLots
          artworks
        }
        highlights {
          partnersConnection(
            first: 10
            displayOnPartnerProfile: true
            representedBy: true
            partnerCategory: $partnerCategory
          ) {
            edges {
              __typename
            }
          }
        }
        biographyBlurb(format: HTML, partnerBio: true) {
          text
        }
        related {
          genes {
            edges {
              node {
                __typename
              }
            }
          }
        }
        insights {
          __typename
        }
      }
    `,
  }
)
