import { Flex, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesArtworkRail_artwork } from "v2/__generated__/ArtistSeriesArtworkRail_artwork.graphql"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { StyledLink } from "v2/Apps/Artist/Components/StyledLink"
import { useTracking } from "react-tracking"
import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"

const HEIGHT = 200

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
  const { filterArtworksConnection, slug } = artistSeries

  const artworks = filterArtworksConnection?.edges?.map(({ node }) => node)

  if (!artworks) {
    return null
  }

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
        <Text variant="subtitle" color="black100">
          More from this series
        </Text>

        <StyledLink
          to={`/artist-series/${slug}`}
          onClick={() => trackViewSeriesClick()}
        >
          <Text variant="text" color="black60">
            View series
          </Text>
        </StyledLink>
      </Flex>
      <Carousel>
        {artworks.map((artwork, index) => {
          return (
            <FillwidthItem
              key={artwork.internalID}
              contextModule={ContextModule.artistSeriesRail}
              artwork={artwork}
              imageHeight={HEIGHT}
              onClick={() =>
                trackArtworkClick(artwork.slug, artwork.internalID, index)
              }
            />
          )
        })}
      </Carousel>
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
              filterArtworksConnection(sort: "-decayed_merch", first: 20) {
                edges {
                  node {
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
