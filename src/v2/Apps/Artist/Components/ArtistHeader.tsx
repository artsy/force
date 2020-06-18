import { ContextModule, Intent } from "@artsy/cohesion"
import { Box, Flex, Sans, Spacer } from "@artsy/palette"
import { ArtistHeader_artist } from "v2/__generated__/ArtistHeader_artist.graphql"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Mediator, SystemContextConsumer } from "v2/Artsy"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { FollowArtistButtonFragmentContainer as FollowArtistButton } from "v2/Components/FollowButton/FollowArtistButton"
import React, { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { get } from "v2/Utils/get"
import { openAuthToFollowSave } from "v2/Utils/openAuthModal"
import { Media } from "v2/Utils/Responsive"
import { ArtistIndicator } from "./ArtistIndicator"
import { highestCategory } from "./MarketInsights/MarketInsights"

/**
 * This H1 and H2 were added for SEO purposes
 * TODO: Remove when palette provides the ability to override typography element
 */
const H1 = styled.h1`
  all: initial;
  all: unset;
  margin: 0;
  padding: 0;
  font: normal;
  font-family: inherit;
  font-size: medium;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  letter-spacing: normal;
  line-height: normal;
`

const H2 = H1.withComponent("h2")

interface Props {
  artist: ArtistHeader_artist
  user?: User
  mediator?: Mediator
}

const CATEGORIES = {
  "blue-chip": "Blue Chip Representation",
  "top-established": "Established Representation",
  "top-emerging": "Emerging Representation",
}

@track<Props>(
  props =>
    ({
      context_module: "Header",
      // TODO: Old schema for the Follow button
      modelName: "artist",
      entity_slug: props.artist.slug,
      entity_id: props.artist.internalID,
    } as Schema.ContextModule & Schema.Old)
)
export class ArtistHeader extends Component<Props> {
  render() {
    const props = this.props
    return (
      <SystemContextConsumer>
        {({ mediator, user }) => {
          return (
            <>
              <Media at="xs">
                <SmallArtistHeader mediator={mediator} user={user} {...props} />
              </Media>
              <Media greaterThan="xs">
                <LargeArtistHeader mediator={mediator} user={user} {...props} />
              </Media>
            </>
          )
        }}
      </SystemContextConsumer>
    )
  }
}

export class LargeArtistHeader extends Component<Props> {
  render() {
    const { props } = this
    const { user } = props

    return (
      <HorizontalPadding>
        <Box width="100%" data-test={ContextModule.artistHeader}>
          <Spacer my={3} />

          <span id="jumpto-ArtistHeader" />

          <Flex justifyContent="space-between">
            <Box>
              <H1>
                <Sans size="10" unstable_trackIn>
                  {props.artist.name}
                </Sans>
              </H1>
              <Flex>
                <H2>
                  <Sans size="3t">
                    {props.artist.formattedNationalityAndBirthday}
                  </Sans>
                </H2>
                <Spacer mr={2} />
              </Flex>
            </Box>
            <Flex justifyContent="space-between">
              {props.artist.counts.follows > 50 && (
                <Flex flexDirection="column" alignItems="center">
                  <Sans size="5t" weight="medium">
                    {props.artist.counts.follows.toLocaleString()}
                  </Sans>
                  <Sans size="2" color="black60" weight="medium">
                    Followers
                  </Sans>
                </Flex>
              )}
              <Spacer mr={3} />
              <FollowArtistButton
                useDeprecatedButtonStyle={false}
                artist={props.artist}
                user={user}
                onOpenAuthModal={() =>
                  handleOpenAuth(props.mediator, props.artist)
                }
              >
                Follow
              </FollowArtistButton>
            </Flex>
          </Flex>
        </Box>
        <Flex flexDirection="row">
          {renderRepresentationStatus(props.artist)}
          {renderAuctionHighlight(props.artist) &&
            renderRepresentationStatus(props.artist) && <Spacer mr={5} />}
          {renderAuctionHighlight(props.artist)}
        </Flex>
      </HorizontalPadding>
    )
  }
}

export class SmallArtistHeader extends Component<Props> {
  render() {
    const props = this.props
    const { user } = props

    return (
      <Flex flexDirection="column" data-test={ContextModule.artistHeader}>
        <span id="jumpto-ArtistHeader" />
        <Box mx={2}>
          <Flex flexDirection="column" alignItems="center">
            <H1>
              <Sans mt={3} size="8" unstable_trackIn>
                {props.artist.name}
              </Sans>
            </H1>
            <Flex>
              <Box mx={1}>
                <H2>
                  <Sans size="3t">
                    {props.artist.formattedNationalityAndBirthday}
                  </Sans>
                </H2>
              </Box>
            </Flex>
          </Flex>
        </Box>
        <Spacer mb={0.5} />
        <Flex flexDirection="row" justifyContent="center">
          {props.artist.counts.follows > 50 && (
            <Flex>
              <Sans size="2" weight="medium">
                {props.artist.counts.follows.toLocaleString()} followers
              </Sans>
              <Sans size="2" color="black100" mx={0.3} display="inline-block">
                •
              </Sans>
            </Flex>
          )}
          <Flex>
            <FollowArtistButton
              artist={props.artist}
              useDeprecatedButtonStyle={false}
              buttonProps={{ width: "100%" }}
              user={user}
              render={({ is_followed }) => {
                return (
                  <Sans
                    size="2"
                    weight="medium"
                    color="black"
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    {is_followed ? "Following" : "Follow"}
                  </Sans>
                )
              }}
              onOpenAuthModal={() =>
                handleOpenAuth(props.mediator, props.artist)
              }
            >
              Follow
            </FollowArtistButton>
          </Flex>
        </Flex>
        <Flex flexDirection="row" justifyContent="center">
          {renderRepresentationStatus(props.artist)}
          {renderAuctionHighlight(props.artist) &&
            renderRepresentationStatus(props.artist) && <Spacer mr={5} />}
          {renderAuctionHighlight(props.artist)}
        </Flex>
      </Flex>
    )
  }
}

const handleOpenAuth = (mediator, artist) => {
  openAuthToFollowSave(mediator, {
    entity: artist,
    contextModule: ContextModule.artistHeader,
    intent: Intent.followArtist,
  })
}

const renderAuctionHighlight = artist => {
  const topAuctionResult = get(
    artist,
    () => artist.auctionResultsConnection.edges[0].node.price_realized.display
  )
  if (topAuctionResult) {
    const auctionLabel = topAuctionResult + " Auction Record"
    return (
      <ArtistIndicator
        label={auctionLabel}
        type="high-auction"
        link={`/artist/${artist.slug}/auction-results`}
      />
    )
  }
}

const renderRepresentationStatus = artist => {
  const { artistHightlights } = artist
  const { partnersConnection } = artistHightlights
  if (
    partnersConnection &&
    partnersConnection.edges &&
    partnersConnection.edges.length > 0
  ) {
    const highCategory = highestCategory(partnersConnection.edges)

    return (
      <ArtistIndicator
        label={CATEGORIES[highCategory]}
        type={highCategory}
        link={`/artist/${artist.slug}/cv`}
      />
    )
  }
}

export const ArtistHeaderFragmentContainer = createFragmentContainer(
  ArtistHeader,
  {
    artist: graphql`
      fragment ArtistHeader_artist on Artist
        @argumentDefinitions(
          partnerCategory: {
            type: "[String]"
            defaultValue: ["blue-chip", "top-established", "top-emerging"]
          }
        ) {
        artistHightlights: highlights {
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
        internalID
        slug
        name
        formattedNationalityAndBirthday
        counts {
          follows
          forSaleArtworks
        }

        ...FollowArtistButton_artist
      }
    `,
  }
)
