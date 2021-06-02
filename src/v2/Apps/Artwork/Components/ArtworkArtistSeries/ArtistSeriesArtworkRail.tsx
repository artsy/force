import { Flex, Link, Shelf, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesArtworkRail_artwork } from "v2/__generated__/ArtistSeriesArtworkRail_artwork.graphql"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
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

  // @ts-expect-error STRICT_NULL_CHECK
  const artistSeries = artistSeriesConnection.edges[0].node
  // @ts-expect-error STRICT_NULL_CHECK
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
      // @ts-expect-error STRICT_NULL_CHECK
      destination_page_owner_id: artistSeries.internalID,
      // @ts-expect-error STRICT_NULL_CHECK
      destination_page_owner_slug: artistSeries.slug,
      type: "viewAll",
    }
    trackEvent(properties)
  }

  return artworks.length > 0 ? (
    <>
      <Flex justifyContent="space-between">
        <Text variant="lg">More from this series</Text>

        <Link
          href={`/artist-series/${slug}`}
          onClick={() => trackViewSeriesClick()}
        >
          <Text variant="md">View series</Text>
        </Link>
      </Flex>

      <Spacer mt={4} />

      <Shelf>
        {artworks.map((artwork, index) => {
          return (
            <ShelfArtworkFragmentContainer
              key={artwork.internalID}
              contextModule={ContextModule.artistSeriesRail}
              artwork={artwork}
              onClick={() =>
                trackArtworkClick(artwork.slug, artwork.internalID, index)
              }
            />
          )
        })}
      </Shelf>
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
                    ...ShelfArtwork_artwork
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
