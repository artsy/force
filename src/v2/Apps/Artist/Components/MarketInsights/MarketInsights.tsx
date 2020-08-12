import { groupBy } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

import colors from "v2/Assets/Colors"
import { unica } from "v2/Assets/Fonts"
import TextLink from "v2/Components/TextLink"
import { Tooltip } from "v2/Components/Tooltip"

import { HelpIcon } from "@artsy/palette"

const MarketInsightsContainer = styled.div`
  ${unica("s14", "medium")};
`

const MarketInsightsDataContainer = styled.div`
  > div {
    display: inline-block;
    padding: 10px 30px;
  }
  border-bottom: 1px solid ${colors.grayRegular};
  border-top: 1px solid ${colors.grayRegular};
  padding: 20px;
  text-align: center;
`

const FeedbackContainer = styled.div`
  color: ${colors.graySemibold};
  padding: 8px 0;
  ${unica("s10")};

  a {
    ${unica("s10")};
  }
`

const TooltipContainer = styled.div`
  display: inline-block;
`

import { MarketInsights_artist } from "v2/__generated__/MarketInsights_artist.graphql"
interface Props extends React.HTMLProps<MarketInsights> {
  artist: MarketInsights_artist
}

const Categories = {
  "blue-chip": "Blue Chip",
  "top-established": "Top Established",
  "top-emerging": "Top Emerging",
}

const orderedCategories = ["blue-chip", "top-established", "top-emerging"]

const CategoryTooltipContent = {
  "blue-chip":
    "Blue chip galleries have multiple locations internationally and participate in major art fairs.",
  "top-established":
    "Top established galleries have been industry leaders in their region or specialty for decades.",
  "top-emerging":
    "Top emerging dealers participate in curated, up-and-coming art fairs.",
}

const groupedByCategories = edges => {
  return groupBy(edges, ({ node: partner }) => {
    let category
    Object.keys(Categories).forEach(key => {
      partner.categories.forEach(partnerCategory => {
        if (partnerCategory.slug === key) {
          category = key
        }
      })
    })
    return category
  })
}

export const highestCategory = edges => {
  const groups = groupedByCategories(edges)
  return orderedCategories.filter(
    category => groups[category] && groups[category].length > 0
  )[0]
}

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

export class MarketInsights extends React.Component<Props, null> {
  renderGalleryCategory(categorySlug, partnerCount) {
    let introSentence
    const category = Categories[categorySlug]
    const categoryTooltipContent = CategoryTooltipContent[categorySlug]
    if (partnerCount > 1) {
      introSentence = "Represented by " + category.toLowerCase() + " galleries"
    } else {
      introSentence = "Represented by a " + category.toLowerCase() + " gallery"
    }

    return (
      <div>
        {introSentence}
        &nbsp;
        <TooltipContainer>
          <Tooltip message={categoryTooltipContent}>
            <span style={{ verticalAlign: "text-top" }}>
              <HelpIcon />
            </span>
          </Tooltip>
        </TooltipContainer>
      </div>
    )
  }

  // We group all partners that represent an artist by their relevant category, from the list above.
  // Assumption: these are mutually exclusive categories among a partner.
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
        <div>
          {this.renderGalleryCategory(
            highCategory,
            groupedByCategories(partnersConnection.edges)[highCategory].length
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

  renderFeedbackLine() {
    return (
      <FeedbackContainer>
        Generated using partial data.&nbsp;
        <TextLink
          color={colors.graySemibold}
          underline
          href='mailto:productfeedback@artsy.net?subject=Feedback on "About the Artist" information'
        >
          Tell us what you think.
        </TextLink>
      </FeedbackContainer>
    )
  }

  render() {
    if (hasSections(this.props.artist)) {
      return (
        <MarketInsightsContainer>
          <MarketInsightsDataContainer>
            {this.renderAuctionHighlight()}
            {this.renderGalleryRepresentation()}
            {this.renderPermanentCollection()}
          </MarketInsightsDataContainer>
          {this.renderFeedbackLine()}
        </MarketInsightsContainer>
      )
    }
    return null
  }
}

export default createFragmentContainer(MarketInsights, {
  artist: graphql`
    fragment MarketInsights_artist on Artist
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
