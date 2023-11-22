import { BorderBox, Box, Join, Spacer } from "@artsy/palette"
import { ArtistMarketInsights_artist$data } from "__generated__/ArtistMarketInsights_artist.graphql"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkDefinitionList } from "Apps/Artwork/Components/ArtworkDefinitionList"
import { groupBy } from "lodash"

export interface MarketInsightsProps {
  artist: ArtistMarketInsights_artist$data
  border?: boolean
  Container?: (props: { children: JSX.Element }) => JSX.Element
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

export class MarketInsights extends Component<MarketInsightsProps> {
  static defaultProps = {
    border: true,
  }

  renderAuctionHighlight() {
    if (
      !this.props.artist.auctionResultsConnection ||
      (this.props.artist.auctionResultsConnection.edges?.length ?? 0) < 1
    ) {
      return null
    }

    const topAuctionResult =
      this.props.artist.auctionResultsConnection?.edges !== null
        ? this.props.artist.auctionResultsConnection.edges?.[0]?.node
        : null

    const display = [
      topAuctionResult?.price_realized?.display,
      topAuctionResult?.organization,
      topAuctionResult?.sale_date,
    ]
      .filter(Boolean)
      .join(", ")

    return (
      <ArtworkDefinitionList term="High auction record">
        {display}
      </ArtworkDefinitionList>
    )
  }
  renderGalleryRepresentation() {
    const { highlights } = this.props.artist
    const partnersConnection = highlights?.partnersConnection

    if (partnersConnection && (partnersConnection?.edges?.length ?? 0) > 0) {
      const highCategory = highestCategory(partnersConnection.edges)

      return (
        <ArtworkDefinitionList term={CATEGORIES[highCategory]}>
          {CATEGORY_LABEL_MAP[highCategory]}
        </ArtworkDefinitionList>
      )
    }
  }
  renderPermanentCollection() {
    const { collections } = this.props.artist

    if (!collections || collections.length === 0) {
      return null
    }

    const label =
      collections.length === 1
        ? "Collected by a major museum"
        : "Collected by major museums"

    return (
      <ArtworkDefinitionList term={label}>
        {collections.join(", ")}
      </ArtworkDefinitionList>
    )
  }

  render() {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    if (!hasSections(this.props.artist)) {
      return null
    }

    let Container

    if (this.props.Container) {
      Container = this.props.Container
    } else if (this.props.border) {
      Container = BorderBox
    } else {
      Container = Box
    }

    return (
      <>
        <Container flexDirection="column">
          <div>
            <Join separator={<Spacer y={1} />}>
              {this.renderAuctionHighlight()}
              {this.renderGalleryRepresentation()}
              {this.renderPermanentCollection()}
            </Join>
          </div>
        </Container>

        {this.props.children}
      </>
    )
  }
}

export const ArtistMarketInsightsFragmentContainer = createFragmentContainer(
  MarketInsights,
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
  }
)

export const hasSections = ({
  highlights,
  auctionResults,
  collections,
}: {
  highlights: { partnersConnection?: { edges: ReadonlyArray<any> } }
  auctionResults?: { edges: ReadonlyArray<any> }
  collections?: ReadonlyArray<any>
}) => {
  const { partnersConnection } = highlights

  // Is there a gallery representation section?
  if (
    partnersConnection &&
    partnersConnection.edges &&
    partnersConnection.edges.length > 0
  ) {
    return true
  }

  // Is there an auction highlights section?
  if (
    auctionResults &&
    auctionResults.edges &&
    auctionResults.edges.length > 0
  ) {
    return true
  }

  // Is there a permanent collections section?
  if (collections && collections.length > 0) {
    return true
  }

  return false
}

const orderedCategories = ["blue-chip", "top-established", "top-emerging"]

export const highestCategory = edges => {
  const groups = groupedByCategories(edges)
  return orderedCategories.filter(
    category => groups[category] && groups[category].length > 0
  )[0]
}

const groupedByCategories = edges => {
  return groupBy(edges, ({ node: partner }) => {
    let category
    Object.keys(CATEGORIES).forEach(key => {
      partner.categories.forEach(partnerCategory => {
        if (partnerCategory.slug === key) {
          category = key
        }
      })
    })
    return category
  })
}
