import { Box, Flex, Sans } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistTopWorksRail_artist } from "v2/__generated__/ArtistTopWorksRail_artist.graphql"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { Media } from "v2/Utils/Responsive"
import { StyledLink } from "v2/Apps/Artist/Components/StyledLink"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { useTracking } from "v2/Artsy"
import * as Schema from "v2/Artsy/Analytics/Schema"
import styled from "styled-components"

interface ArtistTopWorksRailProps {
  artist: ArtistTopWorksRail_artist
  onOverviewTab?: boolean
}

export const ArtistTopWorksRail: React.FC<ArtistTopWorksRailProps> = ({
  artist,
  onOverviewTab,
}) => {
  const tracking = useTracking()
  const carouselHeight = 300
  const artworks = artist?.filterArtworksConnection?.edges ?? []
  const handleViewWorksClick = overviewTab => {
    const ms = overviewTab ? 500 : 0
    return setTimeout(
      () => scrollIntoView({ offset: 60, selector: "#jump--artworkFilter" }),
      ms
    )
  }

  return artworks.length > 0 ? (
    <Flex mb="75px" flexDirection="column">
      <Flex my={1} justifyContent="space-between">
        {/**
         * The H2 tag was added for SEO purposes
         * TODO: Remove when palette provides the ability to override typography element
         */}
        <H2>
          <Sans size="4" color="black100">
            Top Works
          </Sans>
        </H2>
        <StyledLink
          data-test="link-to-works-for-sale"
          onClick={() => handleViewWorksClick(onOverviewTab)}
          to={onOverviewTab ? `/artist/${artist.slug}/works-for-sale` : null} // no need to route if already on Works tab
        >
          <Media at="xs">
            <Sans size="4" color="black60">
              View all
            </Sans>
          </Media>
          <Media greaterThan="xs">
            <Sans size="4" color="black60">
              View all works
            </Sans>
          </Media>
        </StyledLink>
      </Flex>
      <Carousel
        data={artworks}
        height={carouselHeight}
        options={{
          pageDots: false,
        }}
        render={({ node }) => {
          const { image } = node

          return (
            <Box height={376} mb={3} width="auto">
              <FillwidthItem
                artwork={node}
                hidePartnerName
                hideArtistName
                useLighterFont
                targetHeight={image?.resized?.height}
                imageHeight={image?.resized?.height}
                width={image?.resized?.height * image?.imageAspectRatio}
                margin={5}
                showMetadata
                showExtended={false}
                onClick={() => {
                  tracking.trackEvent({
                    action_type: Schema.ActionType.Click,
                    subject: "carouselSlide",
                    destination_path: image.href,
                  })
                }}
              />
            </Box>
          )
        }}
      />
    </Flex>
  ) : null
}

const H2 = styled.h2``

export const ArtistTopWorksRailFragmentContainer = createFragmentContainer(
  ArtistTopWorksRail,
  {
    artist: graphql`
      fragment ArtistTopWorksRail_artist on Artist {
        slug
        filterArtworksConnection(sort: "-weighted_iconicity", first: 10) {
          edges {
            node {
              id
              image {
                href
                imageAspectRatio: aspectRatio
                resized(height: 300) {
                  url
                  width
                  height
                }
              }
              ...FillwidthItem_artwork
            }
          }
        }
      }
    `,
  }
)
