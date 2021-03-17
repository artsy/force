import {
  Box,
  Button,
  ChevronIcon,
  Col,
  Flex,
  Image,
  Link,
  Row,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { Overview_artist } from "v2/__generated__/Overview_artist.graphql"
import { ArtistTopWorksRailFragmentContainer as ArtistTopWorksRail } from "v2/Apps/Artist/Components/ArtistTopWorksRail/ArtistTopWorksRail"
import { ArtistCollectionsRailContent as ArtistCollectionsRail } from "v2/Apps/Artist/Components/ArtistCollectionsRail"
import { hasSections as showMarketInsights } from "v2/Apps/Artist/Components/MarketInsights/MarketInsights"
import { GenesFragmentContainer as Genes } from "v2/Apps/Artist/Routes/Overview/Components/Genes"
import { useTracking, withSystemContext } from "v2/Artsy"
import { Track as TrackType, track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { ArtistBioFragmentContainer as ArtistBio } from "v2/Components/ArtistBio"
import { Carousel } from "v2/Components/Carousel"
import { SelectedCareerAchievementsFragmentContainer as SelectedCareerAchievements } from "v2/Components/SelectedCareerAchievements"

import { ArtistConsignButtonFragmentContainer as ArtistConsignButton } from "v2/Apps/Artist/Components/ArtistConsignButton"
import { StyledLink } from "v2/Apps/Artist/Components/StyledLink"
import { WorksForSaleRailQueryRenderer as WorksForSaleRail } from "v2/Apps/Artist/Routes/Overview/Components/WorksForSaleRail"
import { pMedia } from "v2/Components/Helpers"
import React from "react"
import { RelayRefetchProp, createFragmentContainer, graphql } from "react-relay"
import { TrackingProp } from "react-tracking"
import styled from "styled-components"
import { get } from "v2/Utils/get"
import { Media } from "v2/Utils/Responsive"
import { ArtistRecommendationsQueryRenderer as ArtistRecommendations } from "./Components/ArtistRecommendations"
import { Title } from "react-head"

export interface OverviewRouteProps {
  artist: Overview_artist
  relay?: RelayRefetchProp
  tracking?: TrackingProp
}

const carouselSlideTrack: TrackType = track

interface NavLinkProps {
  path: string
  label: string
}

const NavLink: React.FC<NavLinkProps> = props => {
  const tracking = useTracking()

  return (
    <Flex flexDirection="row" alignItems="center" mt={1}>
      <Text variant="mediumText" mr="3px">
        <StyledLink
          to={props.path}
          onClick={() =>
            tracking.trackEvent({
              action_type: Schema.ActionType.Click,
              destination_path: props.path,
              subject: props.label,
            })
          }
        >
          {props.label}
        </StyledLink>
      </Text>
      <ChevronIcon
        direction="right"
        color="black"
        height="18px"
        width="14px"
        top="-1px"
      />
    </Flex>
  )
}

interface SectionHeaderProps {
  headerString: string
}

const SectionHeader: React.FC<SectionHeaderProps> = props => {
  return (
    <Text variant="subtitle" color="black100" mb={2}>
      {props.headerString}
    </Text>
  )
}

const TruncatedLine = styled.div`
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

// Exported just for tests
export const FeaturedArticlesItem = styled(Flex)`
  min-width: 300px;
  cursor: pointer;

  ${pMedia.xs`
    min-width: "none";
  `};
`

@track()
export class OverviewRoute extends React.Component<OverviewRouteProps, {}> {
  @track<OverviewRouteProps>(props => ({
    action_type: Schema.ActionType.Click,

    destination_path: props.artist.href,
    // TODO: Feel like these should become enums too
    subject: "Learn more about consignment",
  }))
  handleConsignClick() {
    // no-op
  }

  @track<OverviewRouteProps>(props => ({
    action_type: Schema.ActionType.Click,
    context_module: "Overview",
    destination_path: `artist/${props.artist.slug}/works-for-sale`,
    subject: "Browse all works for sale",
  }))
  handleBrowseWorksClick() {
    // no-op
  }

  @carouselSlideTrack((_props, _state, [slide]) => {
    return {
      action_type: Schema.ActionType.Click,
      destination_path: slide.href,
      subject: "showCarouselSlide",
    }
  })
  onClickSlide(slide) {
    // no-op
  }

  @track((_props, _state, [tab, destination_path]: string[]) => ({
    action_type: Schema.ActionType.Click,
    destination_path,
    subject: tab,
  }))
  handleNavigationClick(tab: string, destination_path: string) {
    // no-op
  }

  render() {
    if (!this.props) {
      return null
    }

    const { artist } = this.props
    const showArtistInsights =
      showMarketInsights(this.props.artist) || artist.insights.length > 0
    const showArtistBio = Boolean(artist.biographyBlurb.text)
    const showRelatedCategories =
      get(artist, a => a.related.genes.edges.length, 0) > 0

    const isClient = typeof window !== "undefined"
    const showRecommendations =
      isClient &&
      get(artist, a => a.related.artistsConnection.edges.length, 0) > 0

    const browseWorksButtonLabel =
      artist.counts.forSaleArtworks > 0
        ? `Browse all works for sale (${artist.counts.forSaleArtworks.toLocaleString()})`
        : "Browse all works"

    const currentShows =
      get(artist, a => a.showsConnection.edges.length) &&
      artist.showsConnection.edges.map(({ node }) => node)

    const featuredArticles =
      get(artist, a => a.articlesConnection.edges.length) &&
      artist.articlesConnection.edges.map(({ node }) => node)

    const titleString = `${artist.name} - ${artist.counts.artworks} Artworks, Bio & Shows on Artsy`

    return (
      <>
        <Title>{titleString}</Title>
        <Media greaterThan="xs">
          <Row>
            <Col>
              <ArtistTopWorksRail artist={artist} onOverviewTab />
            </Col>
          </Row>
          <Separator my={3} />

          <Row>
            <Col sm={8}>
              <>
                {showArtistBio && (
                  <>
                    <Text variant="mediumText">Biography</Text>
                    <Spacer mb={1} />
                    <ArtistBio
                      onReadMoreClicked={() => {
                        this.setState({ isReadMoreExpanded: true })
                      }}
                      bio={artist}
                    />
                  </>
                )}
                {showRelatedCategories && (
                  <>
                    {showArtistBio && <Spacer mb={2} />}
                    <Text variant="mediumText">Related Categories</Text>
                    <Spacer mb={1} />
                    <Genes artist={artist} />
                    <Spacer mb={2} />
                  </>
                )}

                <Spacer mb={3} />
                <ArtistConsignButton artist={artist} />
              </>
            </Col>

            {(showArtistInsights || artist.statuses.cv) && (
              <Col sm={4}>
                <Box pl={2} pt={0}>
                  <Text variant="mediumText">Career Highlights</Text>
                  <SelectedCareerAchievements artist={artist} />
                  {artist.statuses.cv && (
                    <>
                      <Spacer mb={2} />
                      <NavLink
                        label="See all past shows and fair booths"
                        path={`/artist/${artist.slug}/cv`}
                      />
                    </>
                  )}
                </Box>
              </Col>
            )}
          </Row>
        </Media>

        <Media at="xs">
          <ArtistTopWorksRail artist={artist} onOverviewTab />

          {showArtistBio && (
            <>
              <Separator my={3} />

              <Text variant="subtitle">Biography</Text>
              <Spacer mb={1} />
              <ArtistBio
                onReadMoreClicked={() => {
                  this.setState({ isReadMoreExpanded: true })
                }}
                bio={artist}
              />
              <Spacer mb={2} />
              <ArtistConsignButton artist={artist} />
            </>
          )}
        </Media>

        <Row>
          <Col>
            <ArtistCollectionsRail artistID={artist.internalID} />
          </Col>
        </Row>

        {artist.statuses.artworks && (
          <>
            <Media at="xs">{showArtistBio && <Separator my={3} />}</Media>

            <Media greaterThan="xs">
              <Separator my={3} />
            </Media>
            <Row>
              <Col>
                <SectionHeader
                  headerString={
                    artist.counts.forSaleArtworks > 0
                      ? "Works For Sale"
                      : "Artworks"
                  }
                />
                {isClient && <WorksForSaleRail artistID={artist.internalID} />}
                <Spacer mb={2} />
                <StyledLink
                  onClick={() => this.handleBrowseWorksClick()}
                  to={`/artist/${artist.slug}/works-for-sale`}
                >
                  <Button variant="secondaryGray" size="medium" width="100%">
                    {browseWorksButtonLabel}
                  </Button>
                </StyledLink>
              </Col>
            </Row>
          </>
        )}

        {(showArtistInsights || artist.statuses.cv) && (
          <Media at="xs">
            <Separator my={3} />
            <Col sm={4}>
              <Box>
                <Text variant="subtitle" color="black100">
                  Career Highlights
                </Text>
                <SelectedCareerAchievements artist={artist} />
                {artist.statuses.cv && (
                  <>
                    <Spacer mb={2} />
                    <NavLink
                      label="See all past shows and fair booths"
                      path={`/artist/${artist.slug}/cv`}
                    />
                  </>
                )}
              </Box>
            </Col>
          </Media>
        )}

        {!!currentShows && (
          <>
            <Separator my={3} />
            <SectionHeader headerString={`Shows Featuring ${artist.name}`} />
            <Carousel arrowHeight={140}>
              {currentShows.map(slide => {
                return (
                  <Box maxWidth={240} key={slide.href}>
                    <Link
                      href={slide.href}
                      onClick={() => this.onClickSlide(slide)}
                      underlineBehavior="none"
                    >
                      <Image
                        src={get(slide, i => i.coverImage.cropped.url)}
                        alt={slide.name}
                        width={get(slide, i => i.coverImage.cropped.width)}
                        height={get(slide, i => i.coverImage.cropped.height)}
                      />
                      <Text variant="mediumText" mt={1}>
                        <TruncatedLine>{slide.name}</TruncatedLine>
                      </Text>
                      <Text variant="caption" color="black60">
                        <TruncatedLine>{slide.exhibitionPeriod}</TruncatedLine>
                      </Text>
                    </Link>
                  </Box>
                )
              })}
            </Carousel>
            <Spacer mb={2} />
            <NavLink
              label="See all current and upcoming shows"
              path={`/artist/${artist.slug}/shows`}
            />
          </>
        )}

        {!!featuredArticles && (
          <>
            <Separator my={3} />
            <SectionHeader headerString={`Articles Featuring ${artist.name}`} />
            <Flex flexWrap="wrap" justifyContent="space-between">
              {featuredArticles.map((article, index) => {
                return (
                  <FeaturedArticlesItem
                    mb={3}
                    width={["100%", "45%"]}
                    justifyContent="space-between"
                    key={`article-${index}`}
                    onClick={() => {
                      window.location.href = article.href
                    }}
                  >
                    <Box width="70%" maxWidth={["none", "300px"]} mr={[1, 2]}>
                      <Text variant="mediumText">{article.thumbnailTitle}</Text>
                      <Text variant="caption" color="black60">
                        {article.publishedAt}
                      </Text>
                    </Box>
                    <Box maxWidth={["90px", "120px"]}>
                      <Image
                        src={get(article, i => i.thumbnailImage.cropped.url)}
                        alt={article.thumbnailTitle}
                        width="100%"
                      />
                    </Box>
                  </FeaturedArticlesItem>
                )
              })}
            </Flex>
            <Spacer mb={-1} />
            <NavLink
              label="See all articles"
              path={`/artist/${artist.slug}/articles`}
            />
          </>
        )}

        {showRelatedCategories && (
          <Media at="xs">
            <Separator my={3} />
            <SectionHeader headerString="Related Categories" />
            <Spacer mb={1} />
            <Genes artist={artist} />
          </Media>
        )}

        {showRecommendations && (
          <Row>
            <Col>
              <Separator my={3} />
              <ArtistRecommendations artistID={artist.internalID} />
            </Col>
          </Row>
        )}
      </>
    )
  }
}

export const OverviewRouteFragmentContainer = createFragmentContainer(
  withSystemContext(OverviewRoute),
  {
    artist: graphql`
      fragment Overview_artist on Artist
        @argumentDefinitions(
          partnerCategory: {
            type: "[String]"
            defaultValue: ["blue-chip", "top-established", "top-emerging"]
          }
        ) {
        ...ArtistBio_bio
        ...CurrentEvent_artist
        ...MarketInsights_artist
        ...SelectedCareerAchievements_artist
        ...Genes_artist
        ...FollowArtistButton_artist
        ...WorksForSaleRail_artist
        ...ArtistConsignButton_artist
        ...ArtistTopWorksRail_artist
        slug
        id
        statuses {
          artworks
          cv(minShowCount: 0)
        }
        counts {
          partner_shows: partnerShows
          forSaleArtworks
          ecommerce_artworks: ecommerceArtworks
          auction_artworks: auctionArtworks
          artworks
          has_make_offer_artworks: hasMakeOfferArtworks
        }
        href
        name
        # NOTE: The following are used to determine whether sections
        # should be rendered.
        biographyBlurb(format: HTML, partnerBio: true) {
          text
        }
        currentEvent {
          name
        }
        related {
          genes {
            edges {
              node {
                slug
              }
            }
          }
          artistsConnection(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
        showsConnection(first: 5, sort: END_AT_ASC, status: "running") {
          edges {
            node {
              name
              href
              exhibitionPeriod
              coverImage {
                cropped(width: 220, height: 140) {
                  url
                  width
                  height
                }
              }
            }
          }
        }
        articlesConnection(
          first: 4
          sort: PUBLISHED_AT_DESC
          inEditorialFeed: true
        ) {
          edges {
            node {
              href
              thumbnailTitle
              publishedAt(format: "MMM Do, YYYY")
              thumbnailImage {
                cropped(width: 120, height: 80) {
                  url
                }
              }
            }
          }
        }
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
        insights {
          type
        }
      }
    `,
  }
)
