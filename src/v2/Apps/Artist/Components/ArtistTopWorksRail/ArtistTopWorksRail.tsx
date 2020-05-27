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
}

export const ArtistTopWorksRail: React.FC<ArtistTopWorksRailProps> = ({
  topRailArtworks,
}) => {
  const carouselHeight = 300
  const artworks = topRailArtworks?.images?.edges ?? []
  const handleViewWorksClick = () => {
    // no-op
  }
  return artworks.length > 0 ? (
    <Flex mb="75px" flexDirection="column">
      <Flex my={1} justifyContent="space-between">
        <Sans size="4" color="black100">
          Top Works
        </Sans>
        <Media at="xs">
          <StyledLink
            onClick={() => handleViewWorksClick()}
            to={`/artist/${topRailArtworks.slug}/works-for-sale`}
          >
            <Sans size="4" color="black60">
              View all
            </Sans>
          </StyledLink>
        </Media>
        <Media greaterThan="xs">
          <StyledLink
            onClick={() => handleViewWorksClick()}
            to={`/artist/${topRailArtworks.slug}/works-for-sale`}
          >
            <Sans size="4" color="black60">
              View all works
            </Sans>
          </StyledLink>
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
