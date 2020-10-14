import React from "react"
import { Link } from "react-head"
import { data as sd } from "sharify"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistMetaCanonicalLink_artist } from "v2/__generated__/ArtistMetaCanonicalLink_artist.graphql"
import { hasSections as showMarketInsights } from "v2/Apps/Artist/Components/MarketInsights/MarketInsights"
import { hasOverviewContent } from "v2/Apps/Artist/Components/NavigationTabs"
import { useRouter } from "v2/Artsy/Router/useRouter"

export const computeCanonicalPath = (
  artist: ArtistMetaCanonicalLink_artist,
  path: string
) => {
  const basePath = `/artist/${artist.slug}`
  const pathParts = [basePath]

  const isConsignPage = path === "consign"

  const hasArtistInsights =
    showMarketInsights(artist) ||
    (artist.insights && artist.insights.length > 0)

  const hasArtistContent = hasOverviewContent(artist)
  const canShowOverview = hasArtistInsights || hasArtistContent

  if (isConsignPage) {
    pathParts.push("/consign")
  } else if (!canShowOverview) {
    pathParts.push("/works-for-sale")
  }

  return pathParts.join("")
}

export type ArtistMetaCanonicalLinkProps = {
  artist: ArtistMetaCanonicalLink_artist
}

export const ArtistMetaCanonicalLink: React.FC<ArtistMetaCanonicalLinkProps> = ({
  artist,
}) => {
  const { pathname } = useRouter().match.location
  const canonicalPath = computeCanonicalPath(artist, pathname)
  const canonicalUrl = `${sd.APP_URL}${canonicalPath}`
  return <Link rel="canonical" href={canonicalUrl} />
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
