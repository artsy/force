import * as React from "react"
import { Link } from "react-head"
import { data as sd } from "sharify"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistMetaCanonicalLink_artist$data } from "v2/__generated__/ArtistMetaCanonicalLink_artist.graphql"
import { useRouter } from "v2/System/Router/useRouter"
import { hasOverviewContent } from "../Routes/Overview/Utils/hasOverviewContent"
import { hasSections } from "v2/Components/ArtistMarketInsights"

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

export type ArtistMetaCanonicalLinkProps = {
  artist: ArtistMetaCanonicalLink_artist$data
}

export const ArtistMetaCanonicalLink: React.FC<ArtistMetaCanonicalLinkProps> = ({
  artist,
}) => {
  const { pathname } = useRouter().match.location
  const hasArtistInsights =
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    hasSections(artist) || (artist.insights && artist.insights.length > 0)

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
        biographyBlurb(format: HTML, partnerBio: false) {
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
