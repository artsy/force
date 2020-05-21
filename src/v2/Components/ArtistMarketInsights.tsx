import { BorderBox, Box, Flex, Sans } from "@artsy/palette"
import { ArtistMarketInsights_artist } from "v2/__generated__/ArtistMarketInsights_artist.graphql"
import {
  hasSections,
  highestCategory,
} from "v2/Apps/Artist/Components/MarketInsights/MarketInsights"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "v2/Utils/Responsive"

export interface MarketInsightsProps {
  artist: ArtistMarketInsights_artist
  border?: boolean
  Container?: (props: { children: JSX.Element }) => JSX.Element
}

export const CATEGORIES = {
  "blue-chip": "Blue chip",
  "top-established": "Established",
  "top-emerging": "Emerging",
}
const CATEGORY_LABEL_MAP = {
  "blue-chip": "Represented by internationally recognized galleries.",
  "top-established": "Represented by industry leading galleries.",
  "top-emerging": "Represented by up-and-coming galleries.",
}

export class MarketInsights extends React.Component<MarketInsightsProps> {
  static defaultProps = {
    border: true,
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
    const display = `${topAuctionResult.price_realized.display}, ${topAuctionResult.organization}, ${topAuctionResult.sale_date}`
    return (
      <TextWrap>
        <Sans size="2" weight="medium" display="inline" mr={1}>
          High auction record
        </Sans>
        <Sans size="2" display="inline" color="black60">
          {display}
        </Sans>
      </TextWrap>
    )
  }
  renderGalleryRepresentation() {
    const { highlights } = this.props.artist
    const { partnersConnection } = highlights
    if (
      partnersConnection &&
      partnersConnection.edges &&
      partnersConnection.edges.length > 0
    ) {
      const highCategory = highestCategory(partnersConnection.edges)
      return (
        <TextWrap>
          <Sans size="2" weight="medium" display="inline" mr={1}>
            {CATEGORIES[highCategory]}
          </Sans>
          <Sans size="2" display="inline" color="black60">
            {CATEGORY_LABEL_MAP[highCategory]}
          </Sans>
        </TextWrap>
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
      <TextWrap>
        <Sans size="2" weight="medium" display="inline" mr={1}>
          {label}
        </Sans>
        <Sans size="2" display="inline" color="black60">
          {collections.join(", ")}
        </Sans>
      </TextWrap>
    )
  }

  render() {
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
            {this.renderAuctionHighlight()}
            {this.renderGalleryRepresentation()}
            {this.renderPermanentCollection()}
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
                display(format: "0a")
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

const TextWrap = props => (
  <>
    <Media at="xs">
      <Flex flexDirection="column" mb={1} {...props} />
    </Media>
    <Media greaterThan="xs">
      <Box {...props} />
    </Media>
  </>
)
