import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { FairBoothRailArtworksQuery } from "__generated__/FairBoothRailArtworksQuery.graphql"
import { FairBoothRailArtworks_show$data } from "__generated__/FairBoothRailArtworks_show.graphql"
import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
  PageOwnerType,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { Shelf } from "@artsy/palette"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { extractNodes } from "Utils/extractNodes"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"

export interface FairBoothRailArtworksProps {
  show: FairBoothRailArtworks_show$data
}

const FairBoothRailArtworks: React.FC<FairBoothRailArtworksProps> = ({
  show,
}) => {
  const tracking = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const clickedFairArtworkData = ({
    artworkID,
    artworkSlug,
    carouselIndex,
  }): ClickedArtworkGroup => {
    return {
      context_module: ContextModule.galleryBoothRail,
      context_page_owner_type: contextPageOwnerType as PageOwnerType,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      destination_page_owner_type: OwnerType.artwork,
      destination_page_owner_id: artworkID,
      destination_page_owner_slug: artworkSlug,
      horizontal_slide_position: carouselIndex,
      type: "thumbnail",
      action: ActionType.clickedArtworkGroup,
    }
  }

  const artworks = extractNodes(show.artworksConnection)

  return (
    <Shelf>
      {artworks.map((artwork, index) => {
        return (
          <ShelfArtworkFragmentContainer
            key={artwork.internalID}
            contextModule={ContextModule.fairRail}
            artwork={artwork}
            lazyLoad
            onClick={() =>
              tracking.trackEvent(
                clickedFairArtworkData({
                  artworkID: artwork.internalID,
                  artworkSlug: artwork.slug,
                  carouselIndex: index,
                })
              )
            }
          />
        )
      })}
    </Shelf>
  )
}

const PLACEHOLDER = (
  <Shelf>
    {[...new Array(10)].map((_, i) => {
      return <ShelfArtworkPlaceholder key={i} index={i} />
    })}
  </Shelf>
)

export const FairBoothRailArtworksFragmentContainer = createFragmentContainer(
  FairBoothRailArtworks,
  {
    show: graphql`
      fragment FairBoothRailArtworks_show on Show {
        artworksConnection(first: 20) {
          edges {
            node {
              ...ShelfArtwork_artwork
              internalID
              slug
            }
          }
        }
      }
    `,
  }
)

export const FairBoothRailArtworksQueryRenderer: React.FC<{
  id: string
}> = ({ id, ...rest }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<FairBoothRailArtworksQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query FairBoothRailArtworksQuery($id: String!) {
          show(id: $id) {
            ...FairBoothRailArtworks_show
          }
        }
      `}
      variables={{ id }}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          return null
        }

        if (!props) {
          return PLACEHOLDER
        }

        if (props.show) {
          return (
            <FairBoothRailArtworksFragmentContainer
              {...rest}
              show={props.show}
            />
          )
        }

        return null
      }}
    />
  )
}
