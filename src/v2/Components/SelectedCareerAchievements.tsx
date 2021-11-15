import {
  BorderBox,
  Box,
  Flex,
  Spacer,
  useThemeConfig,
  Text,
} from "@artsy/palette"
import { SelectedCareerAchievements_artist } from "v2/__generated__/SelectedCareerAchievements_artist.graphql"

import { ArtistInsight } from "v2/Components/ArtistInsight"
import { ArtistInsightsModal } from "v2/Components/ArtistInsightsModal"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SpaceProps } from "styled-system"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ChevronButton } from "./ChevronButton"
import { highestCategory, hasSections } from "./ArtistMarketInsights"

export interface SelectedCareerAchievementsProps extends SpaceProps {
  artist: SelectedCareerAchievements_artist
  themeVersion?: string
  onlyCareerHighlights?: boolean
}

const CATEGORIES = {
  "blue-chip": "Blue-chip representation",
  "top-established": "Established representation",
  "top-emerging": "Emerging representation",
}
const CATEGORY_LABEL_MAP = {
  "blue-chip": "Represented by internationally reputable galleries.",
  "top-established": "Represented by industry leading galleries.",
  "top-emerging": "Represented by up-and-coming galleries.",
}

export class SelectedCareerAchievements extends Component<
  SelectedCareerAchievementsProps
> {
  state = {
    showModal: false,
  }

  defaultProps: {
    onlyCareerHighlights: false
  }

  renderAuctionHighlight() {
    if (
      !this.props.artist.auctionResultsConnection ||
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      this.props.artist.auctionResultsConnection.edges.length < 1
    ) {
      return null
    }
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const topAuctionResult = this.props.artist.auctionResultsConnection.edges[0]
      .node
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const display = `${topAuctionResult.price_realized.display}, ${topAuctionResult.organization}, ${topAuctionResult.sale_date}`

    return (
      <ArtistInsight
        key="HIGH_AUCTION"
        type="HIGH_AUCTION"
        label="High auction record"
        value={display}
        themeVersion={this.props.themeVersion}
      />
    )
  }
  renderGalleryRepresentation() {
    const { highlights } = this.props.artist
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
          themeVersion={this.props.themeVersion}
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
        themeVersion={this.props.themeVersion}
      />
    )
  }

  render() {
    if (
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      !hasSections(this.props.artist) &&
      (!this.props.artist.insights || this.props.artist.insights.length === 0)
    ) {
      return (
        <>
          <RouterLink to={`${this.props.artist.slug}/cv`}>
            <ChevronButton>See all past shows and fair booths</ChevronButton>
          </RouterLink>
          <Spacer my={4} />
        </>
      )
    }

    if (this.props.themeVersion === "v2") {
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

                {/*  @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
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

    // V3 theme
    return (
      <Box {...this.props}>
        {this.props.onlyCareerHighlights ? (
          <>
            <Text variant="lg" mb={4}>
              Career highlights
            </Text>
            <Flex flexWrap="wrap" pr={2}>
              {this.props.artist?.insights?.map(insight => {
                return this.renderInsight(insight)
              })}
            </Flex>

            <Spacer my={2} />

            <RouterLink to={`${this.props.artist.slug}/cv`}>
              <ChevronButton>See all past shows and fair booths</ChevronButton>
            </RouterLink>
          </>
        ) : (
          <Flex flexDirection="column">
            {this.renderGalleryRepresentation()}
            {this.renderAuctionHighlight()}
          </Flex>
        )}
      </Box>
    )
  }
}

export const SelectedCareerAchievementsFragmentContainer = createFragmentContainer(
  (props: SelectedCareerAchievementsProps) => {
    const tokens = useThemeConfig({
      v2: {
        version: "v2",
      },
      v3: {
        version: "v3",
      },
    })

    return (
      <SelectedCareerAchievements {...props} themeVersion={tokens.version} />
    )
  },
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
                display(format: "0.0a")
              }
              organization
              sale_date: saleDate(format: "YYYY")
            }
          }
        }
        slug
      }
    `,
  }
)
