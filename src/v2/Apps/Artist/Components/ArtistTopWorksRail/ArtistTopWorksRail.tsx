import { Box, Flex, Sans } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistTopWorksRail_topRailArtworks } from "v2/__generated__/ArtistTopWorksRail_topRailArtworks.graphql"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { Media } from "v2/Utils/Responsive"
import { StyledLink } from "v2/Apps/Artist/Components/StyledLink"

interface ArtistTopWorksRailProps {
  topRailArtworks: ArtistTopWorksRail_topRailArtworks
  onOverviewTab?: boolean
}

export const ArtistTopWorksRail: React.FC<ArtistTopWorksRailProps> = ({
  topRailArtworks,
  onOverviewTab,
}) => {
  const carouselHeight = 300
  const artworks = topRailArtworks?.images?.edges ?? []
  const handleViewWorksClick = event => {
    return setTimeout(() => scrollToArtworkView(event), 500)
  }

  const scrollToArtworkView = event => {
    const $element = document.getElementById("jump--artworkFilter")

    if ($element) {
      const { top } = getElementPosition($element)
      window.scrollTo({
        top: top,
      })
    }
  }

  const getElementPosition = $element => {
    const rect = $element.getBoundingClientRect()
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
    }
  }

  return artworks.length > 0 ? (
    <Flex mb="75px" flexDirection="column">
      <Flex my={1} justifyContent="space-between">
        <Sans size="4" color="black100">
          Top Works
        </Sans>
        <Media at="xs">
          {onOverviewTab ? (
            <StyledLink
              onClick={e => handleViewWorksClick(e)}
              to={`/artist/${topRailArtworks.slug}/works-for-sale`}
            >
              <Sans size="4" color="black60">
                View all
              </Sans>
            </StyledLink>
          ) : (
            <Box
              onClick={e => scrollToArtworkView(e)}
              style={{ cursor: "pointer" }}
            >
              <Sans size="4" color="black60">
                View all
              </Sans>
            </Box>
          )}
        </Media>
        <Media greaterThan="xs">
          {onOverviewTab ? (
            <StyledLink
              onClick={e => handleViewWorksClick(e)}
              data-test="link-to-works-for-sale"
              to={`/artist/${topRailArtworks.slug}/works-for-sale`}
            >
              <Sans size="4" color="black60">
                View all works
              </Sans>
            </StyledLink>
          ) : (
            <Box
              onClick={e => scrollToArtworkView(e)}
              style={{ cursor: "pointer" }}
            >
              <Sans size="4" color="black60">
                View all works
              </Sans>
            </Box>
          )}
        </Media>
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
              />
            </Box>
          )
        }}
      />
    </Flex>
  ) : null
}

export const ArtistTopWorksRailFragmentContainer = createFragmentContainer(
  ArtistTopWorksRail,
  {
    topRailArtworks: graphql`
      fragment ArtistTopWorksRail_topRailArtworks on Artist {
        slug
        images: artworksConnection(first: 10, sort: ICONICITY_DESC) {
          edges {
            node {
              id
              image {
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
