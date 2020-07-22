import { Box, Flex, Sans, Separator } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesArtworkRail_artwork } from "v2/__generated__/ArtistSeriesArtworkRail_artwork.graphql"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { StyledLink } from "v2/Apps/Artist/Components/StyledLink"
import { getENV } from "v2/Utils/getENV"

interface Props {
  artwork: ArtistSeriesArtworkRail_artwork
}

export const ArtistSeriesArtworkRail: React.FC<Props> = ({
  artwork: { artistSeriesConnection },
}) => {
  if (!artistSeriesConnection.edges.length) {
    return null
  }

  const artistSeries = artistSeriesConnection.edges[0].node
  const { artworksConnection, slug } = artistSeries

  const artworks = artworksConnection.edges.map(({ node }) => node)

  const isMobile = getENV("IS_MOBILE") === true

  return artworks.length > 0 ? (
    <>
      <Separator my={3} />
      <Flex mb={1} justifyContent="space-between">
        <Sans size="4" color="black100">
          More from this series
        </Sans>

        <StyledLink to={`/artist-series/${slug}`}>
          <Sans size="4" color="black60">
            View all works
          </Sans>
        </StyledLink>
      </Flex>
      <Box mx={[-20, 0]}>
        <Carousel
          data={artworks}
          options={{
            pageDots: false,
          }}
          render={(artwork, index) => {
            const { image } = artwork
            return (
              <Box mb={3} width="auto">
                <FillwidthItem
                  artwork={artwork}
                  useLighterFont
                  targetHeight={200}
                  imageHeight={image?.resized.height}
                  width={image?.resized.width}
                  marginRight={5}
                  marginLeft={isMobile && index === 0 ? 20 : 0}
                />
              </Box>
            )
          }}
        />
      </Box>
      <Separator my={3} />
    </>
  ) : null
}

export const ArtistSeriesArtworkRailFragmentContainer = createFragmentContainer(
  ArtistSeriesArtworkRail,
  {
    artwork: graphql`
      fragment ArtistSeriesArtworkRail_artwork on Artwork {
        artistSeriesConnection(first: 1) {
          edges {
            node {
              slug
              artworksConnection(first: 20) {
                edges {
                  node {
                    image {
                      resized(height: 200) {
                        height
                        width
                      }
                    }
                    ...FillwidthItem_artwork
                  }
                }
              }
            }
          }
        }
      }
    `,
  }
)
