import React from "react"
import { QueryRenderer, createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { FairExhibitorRailArtworksQuery } from "v2/__generated__/FairExhibitorRailArtworksQuery.graphql"
import { FairExhibitorRailArtworks_show } from "v2/__generated__/FairExhibitorRailArtworks_show.graphql"
import { FairExhibitorRailPlaceholder } from "./FairExhibitorRailPlaceholder"
import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "v2/System/Analytics/AnalyticsContext"
import { Shelf } from "@artsy/palette"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"

export interface FairExhibitorRailArtworksProps {
  show: FairExhibitorRailArtworks_show
}

const FairExhibitorRailArtworks: React.FC<FairExhibitorRailArtworksProps> = ({
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
      // @ts-expect-error STRICT_NULL_CHECK
      context_page_owner_type: contextPageOwnerType,
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

  return (
    <Shelf>
      {/* @ts-expect-error STRICT_NULL_CHECK */}
      {show.artworks.edges.map(({ artwork }, index) => {
        return (
          <ShelfArtworkFragmentContainer
            contextModule={ContextModule.fairRail}
            artwork={artwork}
            hidePartnerName
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

export const FairExhibitorRailArtworksFragmentContainer = createFragmentContainer(
  FairExhibitorRailArtworks,
  {
    show: graphql`
      fragment FairExhibitorRailArtworks_show on Show {
        artworks: artworksConnection(first: 20) {
          edges {
            artwork: node {
              internalID
              slug
              ...ShelfArtwork_artwork @arguments(width: 200)
            }
          }
        }
      }
    `,
  }
)

export const FairExhibitorRailArtworksQueryRenderer: React.FC<{
  id: string
}> = ({ id, ...rest }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<FairExhibitorRailArtworksQuery>
      //  @ts-expect-error STRICT_NULL_CHECK
      environment={relayEnvironment}
      query={graphql`
        query FairExhibitorRailArtworksQuery($id: String!) {
          show(id: $id) {
            ...FairExhibitorRailArtworks_show
          }
        }
      `}
      variables={{ id }}
      render={({ error, props }) => {
        if (error || !props) return <FairExhibitorRailPlaceholder />
        return (
          // @ts-expect-error STRICT_NULL_CHECK
          <FairExhibitorRailArtworksFragmentContainer {...rest} {...props} />
        )
      }}
    />
  )
}
