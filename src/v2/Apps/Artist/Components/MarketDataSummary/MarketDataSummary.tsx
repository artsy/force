import { unica } from "v2/Assets/Fonts"
import { groupBy } from "lodash"
import React from "react"
// @ts-ignore
import { ComponentRef, createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

export const MarketDataSummaryContainer = styled.div`
  ${unica("s14")};
`
import { MarketDataSummary_artist } from "v2/__generated__/MarketDataSummary_artist.graphql"
export interface Props extends React.HTMLProps<MarketDataSummary> {
  artist: MarketDataSummary_artist
  onEmptyText?: string
}

const Categories = {
  "blue-chip": "Blue Chip",
  "top-established": "Top Established",
  "top-emerging": "Top Emerging",
}
const orderedCategories = ["blue-chip", "top-established", "top-emerging"]

export class MarketDataSummary extends React.Component<Props, null> {
  renderGalleryCategory(categorySlug, partnerCount) {
    let introSentence
    const category = Categories[categorySlug]
    if (partnerCount > 1) {
      introSentence = "Represented by " + category.toLowerCase() + " galleries"
    } else {
      introSentence = "Represented by a " + category.toLowerCase() + " gallery"
    }
    return <div>{introSentence}</div>
  }

  hasSections() {
    const {
      highlights,
      auctionResultsConnection,
      collections,
    } = this.props.artist
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
      auctionResultsConnection &&
      auctionResultsConnection.edges &&
      auctionResultsConnection.edges.length > 0
    ) {
      return true
    }

    // Is there a permanent collections section?
    if (collections && collections.length > 0) {
      return true
    }

    return false
  }

  // We group all partners that represent an artist by their relevant category, from the list above.
  // Display the highest category string for all the partners that represent the artist
  renderGalleryRepresentation() {
    const { highlights } = this.props.artist
    const { partnersConnection } = highlights
    if (
      partnersConnection &&
      partnersConnection.edges &&
      partnersConnection.edges.length > 0
    ) {
      const groupedByCategory = groupBy(
        partnersConnection.edges,
        ({ node: partner }) => {
          let category
          Object.keys(Categories).forEach(key => {
            partner.categories.forEach(partnerCategory => {
              if (partnerCategory.slug === key) {
                category = key
              }
            })
          })
          return category
        }
      )

      const highestCategory = orderedCategories.filter(
        category =>
          groupedByCategory[category] && groupedByCategory[category].length > 0
      )[0]

      return (
        <div>
          {this.renderGalleryCategory(
            highestCategory,
            groupedByCategory[highestCategory].length
          )}
        </div>
      )
    }
  }

  renderAuctionHighlight() {
    if (
      !this.props.artist.auctionResultsConnection ||
      this.props.artist.auctionResultsConnection.edges.length < 1
    ) {
      return null
    }
    const topAuctionResult = this.props.artist.auctionResultsConnection.edges[0]
      .node
    return <div>{topAuctionResult.price_realized.display} auction record</div>
  }

  renderPermanentCollection() {
    const { collections } = this.props.artist
    if (!collections || collections.length === 0) {
      return null
    }
    if (collections.length === 1) {
      return <div>Collected by a major museum</div>
    }
    return <div>Collected by major museums</div>
  }

  render() {
    const { onEmptyText } = this.props

    if (this.hasSections()) {
      return (
        <MarketDataSummaryContainer>
          {this.renderAuctionHighlight()}
          {this.renderGalleryRepresentation()}
          {this.renderPermanentCollection()}
        </MarketDataSummaryContainer>
      )
    } else if (onEmptyText) {
      return (
        <MarketDataSummaryContainer>{onEmptyText}</MarketDataSummaryContainer>
      )
    }
    return null
  }
}

export default createFragmentContainer(MarketDataSummary, {
  artist: graphql`
    fragment MarketDataSummary_artist on Artist
      @argumentDefinitions(
        partnerCategory: {
          type: "[String]"
          defaultValue: ["blue-chip", "top-established", "top-emerging"]
        }
      ) {
      internalID
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
              display(format: "0a")
            }
          }
        }
      }
    }
  `,
})
