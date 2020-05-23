import { BorderBox, Flex, Spacer } from "@artsy/palette"
import { SelectedCareerAchievements_artist } from "v2/__generated__/SelectedCareerAchievements_artist.graphql"
import {
  hasSections,
  highestCategory,
} from "v2/Apps/Artist/Components/MarketInsights/MarketInsights"

import { ArtistInsight } from "v2/Components/ArtistInsight"
import { ArtistInsightsModal } from "v2/Components/ArtistInsightsModal"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface SelectedCareerAchievementsProps {
  artist: SelectedCareerAchievements_artist
}

const CATEGORIES = {
  "blue-chip": "Blue chip representation",
  "top-established": "Established representation",
  "top-emerging": "Emerging representation",
}
const CATEGORY_LABEL_MAP = {
  "blue-chip": "Represented by internationally reputable galleries.",
  "top-established": "Represented by industry leading galleries.",
  "top-emerging": "Represented by up-and-coming galleries.",
}

export class SelectedCareerAchievements extends React.Component<
  SelectedCareerAchievementsProps
  > {
  state = {
    showModal: false,
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
      <ArtistInsight
        key="HIGH_AUCTION"
        type="HIGH_AUCTION"
        label="High auction record"
        value={display}
      />
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
      const type = highCategory.toUpperCase().replace("-", "_")
      const label = CATEGORIES[highCategory]

      return (
        <ArtistInsight
          key={type}
          type={type}
          label={label}
          value={CATEGORY_LABEL_MAP[highCategory]}
        />
      )
    }
  }

  renderInsight(insight) {
    return (
      <ArtistInsight
        key={insight.type}
        type={insight.type}
        label={insight.label}
        entities={insight.entities}
      />
    )
  }

  render() {
    if (
      !hasSections(this.props.artist) &&
      (!this.props.artist.insights || this.props.artist.insights.length === 0)
    ) {
      return null
    }

    return (
      <>
        <ArtistInsightsModal />
        <Spacer mb={2} />

        <BorderBox pt={1}>
          <Flex flexDirection="column" alignItems="left" width="100%">
            <Flex
              flexDirection="column"
              flexWrap="wrap"
              justifyContent="space-between"
            >
              {this.renderGalleryRepresentation()}
              {this.renderAuctionHighlight()}

              {this.props.artist.insights.map(insight => {
                return this.renderInsight(insight)
              })}
            </Flex>
          </Flex>
        </BorderBox>

        {this.props.children}
      </>
    )
  }
}

export const SelectedCareerAchievementsFragmentContainer = createFragmentContainer(
  SelectedCareerAchievements,
  {
    artist: graphql`
      fragment SelectedCareerAchievements_artist on Artist
        @argumentDefinitions(
          partnerCategory: {
            type: "[String]"
            defaultValue: ["blue-chip", "top-established", "top-emerging"]
          }
        ) {
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
        insights {
          type
          label
          entities
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
