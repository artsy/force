import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesArtworkRail_artwork$data } from "__generated__/ArtistSeriesArtworkRail_artwork.graphql"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import { useTracking } from "react-tracking"
import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { extractNodes } from "Utils/extractNodes"
import { Rail } from "Components/Rail/Rail"

interface Props {
  artwork: ArtistSeriesArtworkRail_artwork$data
}

export const ArtistSeriesArtworkRail: React.FC<Props> = ({ artwork }) => {
  const { trackEvent } = useTracking()
  const { artistSeriesConnection } = artwork
  const nodes = extractNodes(artistSeriesConnection)

  if (nodes.length === 0) {
    return null
  }

  const node = nodes[0]
  const artworks = extractNodes(node.filterArtworksConnection)

  if (artworks.length === 0) {
    return null
  }

  return (
    <Rail
      title="More From This Series"
      viewAllLabel="View series"
      viewAllHref={`/artist-series/${node.slug}`}
      viewAllOnClick={() => {
        const properties: ClickedArtworkGroup = {
          action: ActionType.clickedArtworkGroup,
          context_module: ContextModule.moreFromThisSeries,
          context_page_owner_type: OwnerType.artwork,
          context_page_owner_slug: artwork.slug,
          context_page_owner_id: artwork.internalID,
          destination_page_owner_type: OwnerType.artistSeries,
          destination_page_owner_id: node.internalID,
          destination_page_owner_slug: node.slug,
          type: "viewAll",
        }
        trackEvent(properties)
      }}
      getItems={() => {
        return artworks.map((artwork, index) => {
          return (
            <ShelfArtworkFragmentContainer
              key={artwork.internalID}
              contextModule={ContextModule.artistSeriesRail}
              artwork={artwork}
              onClick={() => {
                const properties: ClickedArtworkGroup = {
                  action: ActionType.clickedArtworkGroup,
                  context_module: ContextModule.moreFromThisSeries,
                  context_page_owner_type: OwnerType.artwork,
                  context_page_owner_slug: artwork.slug,
                  context_page_owner_id: artwork.internalID,
                  destination_page_owner_type: OwnerType.artwork,
                  destination_page_owner_id: artwork.internalID,
                  destination_page_owner_slug: artwork.slug,
                  horizontal_slide_position: index,
                  type: "thumbnail",
                }
                trackEvent(properties)
              }}
            />
          )
        })
      }}
    />
  )
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
