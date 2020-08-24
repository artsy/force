import { Box, Flex, Sans } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesArtworkRail_artwork } from "v2/__generated__/ArtistSeriesArtworkRail_artwork.graphql"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { StyledLink } from "v2/Apps/Artist/Components/StyledLink"
import { getENV } from "v2/Utils/getENV"
import { useTracking } from "react-tracking"
import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"

interface Props {
  artwork: ArtistSeriesArtworkRail_artwork
}

export const ArtistSeriesArtworkRail: React.FC<Props> = ({ artwork }) => {
  const { trackEvent } = useTracking()
  const { artistSeriesConnection } = artwork

  if (!artistSeriesConnection?.edges?.length) {
    return null
  }

  const artistSeries = artistSeriesConnection.edges[0].node
  const { artworksConnection, slug } = artistSeries

  const artworks = artworksConnection?.edges?.map(({ node }) => node)

  if (!artworks) {
    return null
  }

  const isMobile = getENV("IS_MOBILE") === true

  const trackArtworkClick = (artworkSlug, artworkID, index) => {
    const properties: ClickedArtworkGroup = {
      action: ActionType.clickedArtworkGroup,
      context_module: ContextModule.moreFromThisSeries,
      context_page_owner_type: OwnerType.artwork,
      context_page_owner_slug: artwork.slug,
      context_page_owner_id: artwork.internalID,
      destination_page_owner_type: OwnerType.artwork,
      destination_page_owner_id: artworkID,
      destination_page_owner_slug: artworkSlug,
      horizontal_slide_position: index,
      type: "thumbnail",
    }
    trackEvent(properties)
  }

  const trackViewSeriesClick = () => {
    const properties: ClickedArtworkGroup = {
      action: ActionType.clickedArtworkGroup,
      context_module: ContextModule.moreFromThisSeries,
      context_page_owner_type: OwnerType.artwork,
      context_page_owner_slug: artwork.slug,
      context_page_owner_id: artwork.internalID,
      destination_page_owner_type: OwnerType.artistSeries,
      destination_page_owner_id: artistSeries.internalID,
      destination_page_owner_slug: artistSeries.slug,
      type: "viewAll",
    }
    trackEvent(properties)
  }

  return artworks.length > 0 ? (
    <>
      <Flex mb={1} justifyContent="space-between">
        <Sans size="4" color="black100">
          More from this series
        </Sans>

        <StyledLink
          to={`/artist-series/${slug}`}
          onClick={() => trackViewSeriesClick()}
        >
          <Sans size="4" color="black60">
            View series
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
                  onClick={() =>
                    trackArtworkClick(artwork.slug, artwork.internalID, index)
                  }
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
    </>
  ) : null
}

export const ArtistSeriesArtworkRailFragmentContainer = createFragmentContainer(
  ArtistSeriesArtworkRail,
  {
    artwork: graphql`
      fragment ArtistSeriesArtworkRail_artwork on Artwork {
        internalID
        slug
        artistSeriesConnection(first: 1) {
          edges {
            node {
              slug
              internalID
              artworksConnection(first: 20) {
                edges {
                  node {
                    image {
                      resized(height: 200) {
                        height
                        width
                      }
                    }
                    slug
                    internalID
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
