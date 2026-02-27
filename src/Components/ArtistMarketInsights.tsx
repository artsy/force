import { BorderBox, Box } from "@artsy/palette"
import {
  DefinitionList,
  type DefinitionListItem,
} from "Components/DefinitionList"
import type { ArtistMarketInsights_artist$data } from "__generated__/ArtistMarketInsights_artist.graphql"
import type * as React from "react"
import { useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface ArtistMarketInsightsProps {
  artist: ArtistMarketInsights_artist$data
  border?: boolean
  Container?: React.ComponentType<
    React.PropsWithChildren<{ flexDirection?: string }>
  >
}

export const CATEGORIES = {
  "blue-chip": "Blue-chip",
  "top-established": "Established",
  "top-emerging": "Emerging",
}
const CATEGORY_LABEL_MAP = {
  "blue-chip": "Represented by internationally recognized galleries.",
  "top-established": "Represented by industry leading galleries.",
  "top-emerging": "Represented by up-and-coming galleries.",
}

type CategorySlug = keyof typeof CATEGORIES

export const ArtistMarketInsights: React.FC<
  React.PropsWithChildren<ArtistMarketInsightsProps>
> = ({ artist, border = true, Container: CustomContainer, children }) => {
  const hasAnySections = useMemo(() => hasSections(artist), [artist])

  if (!hasAnySections) {
    return null
  }

  const Container = CustomContainer ?? (border ? BorderBox : Box)

  const items = useMemo(() => {
    const entries: DefinitionListItem[] = []

    const topAuctionResult = artist.auctionResultsConnection?.edges?.[0]?.node
    const auctionDisplay = [
      topAuctionResult?.price_realized?.display,
      topAuctionResult?.organization,
      topAuctionResult?.sale_date,
    ]
      .filter(Boolean)
      .join(", ")

    if (auctionDisplay) {
      entries.push({ term: "High auction record", value: auctionDisplay })
    }

    const highCategory = highestCategory(artist)

    if (highCategory) {
      entries.push({
        term: CATEGORIES[highCategory],
        value: CATEGORY_LABEL_MAP[highCategory],
      })
    }

    if (artist.collections && artist.collections.length > 0) {
      const label =
        artist.collections.length === 1
          ? "Collected by a major museum"
          : "Collected by major museums"

      entries.push({ term: label, value: artist.collections.join(", ") })
    }

    return entries
  }, [artist])

  return (
    <>
      <Container flexDirection="column">
        <DefinitionList items={items} />
      </Container>

      {children}
    </>
  )
}

export const ArtistMarketInsightsFragmentContainer = createFragmentContainer(
  ArtistMarketInsights,
  {
    artist: graphql`
      fragment ArtistMarketInsights_artist on Artist
      @argumentDefinitions(
        partnerCategory: {
          type: "[String]"
          defaultValue: ["blue-chip", "top-established", "top-emerging"]
        }
      ) {
        collections
        highlights {
          partnersConnection(
            first: 10
            displayOnPartnerProfile: true
            representedBy: true
            partnerCategory: $partnerCategory
          ) {
            edges {
              node {
                categories {
                  slug
                }
              }
            }
          }
        }
        auctionResultsConnection(
          recordsTrusted: true
          first: 1
          sort: PRICE_AND_DATE_DESC
        ) {
          edges {
            node {
              price_realized: priceRealized {
                display(format: "0.0a")
              }
              organization
              sale_date: saleDate(format: "YYYY")
            }
          }
        }
      }
    `,
  },
)

export const hasSections = (artist: ArtistMarketInsights_artist$data) => {
  return Boolean(
    (artist.highlights?.partnersConnection?.edges?.length ?? 0) > 0 ||
      (artist.auctionResultsConnection?.edges?.length ?? 0) > 0 ||
      (artist.collections?.length ?? 0) > 0,
  )
}

const ORDERED_CATEGORIES: CategorySlug[] = [
  "blue-chip",
  "top-established",
  "top-emerging",
]

export const highestCategory = (
  artist: ArtistMarketInsights_artist$data,
): CategorySlug | null => {
  const edges = artist.highlights?.partnersConnection?.edges ?? []

  for (const category of ORDERED_CATEGORIES) {
    const hasMatch = edges.some(edge =>
      (edge?.node?.categories ?? []).some(
        partnerCategory => partnerCategory?.slug === category,
      ),
    )

    if (hasMatch) {
      return category
    }
  }

  return null
}
