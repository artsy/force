import React from "react"
import { Link } from "react-head"
import { data as sd } from "sharify"
import { createFragmentContainer, graphql } from "react-relay"
import { Artist2MetaCanonicalLink_artist } from "v2/__generated__/Artist2MetaCanonicalLink_artist.graphql"
import { hasSections as showMarketInsights } from "v2/Apps/Artist2/Components/MarketInsights/MarketInsights"
import { useRouter } from "v2/Artsy/Router/useRouter"
import { hasOverviewContent } from "../Routes/Overview/Utils/hasOverviewContent"

export const computeCanonicalPath = (
  appUrl: string,
  artistSlug: string,
  path: string,
  canShowOverview: boolean
) => {
  const urlParts = [appUrl, "artist", artistSlug]

  const isConsignPage = path.endsWith("consign")
  const isWorksForSalePage = path.endsWith("works-for-sale")
  const isAuctionResultsPage = path.endsWith("auction-results")

  if (isConsignPage) {
    urlParts.push("consign")
  } else if (isWorksForSalePage || !canShowOverview) {
    urlParts.push("works-for-sale")
  } else if (isAuctionResultsPage) {
    urlParts.push("auction-results")
  }

  return urlParts.join("/")
}

export type Artist2MetaCanonicalLinkProps = {
  artist: Artist2MetaCanonicalLink_artist
}

export const Artist2MetaCanonicalLink: React.FC<Artist2MetaCanonicalLinkProps> = ({
  artist,
}) => {
  const { pathname } = useRouter().match.location
  const hasArtistInsights =
    // @ts-expect-error STRICT_NULL_CHECK
    showMarketInsights(artist) ||
    (artist.insights && artist.insights.length > 0)

  // @ts-expect-error STRICT_NULL_CHECK
  const hasArtistContent = hasOverviewContent(artist)
  const canShowOverview = hasArtistInsights || hasArtistContent

  const canonicalUrl = computeCanonicalPath(
    sd.APP_URL,
    artist.slug,
    pathname,
    canShowOverview
  )

  return <Link rel="canonical" href={canonicalUrl} />
}

export const Artist2MetaCanonicalLinkFragmentContainer = createFragmentContainer(
  Artist2MetaCanonicalLink,
  {
    artist: graphql`
      fragment Artist2MetaCanonicalLink_artist on Artist
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
