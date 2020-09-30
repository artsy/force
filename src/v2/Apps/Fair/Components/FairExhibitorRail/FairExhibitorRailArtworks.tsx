import React from "react"
import { QueryRenderer, createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/Artsy"
import { FairExhibitorRailArtworksQuery } from "v2/__generated__/FairExhibitorRailArtworksQuery.graphql"
import { FairExhibitorRailArtworks_show } from "v2/__generated__/FairExhibitorRailArtworks_show.graphql"
import { FAIR_EXHIBITOR_IMAGE_HEIGHT } from "./FairExhibitorRail"
import { FairExhibitorRailPlaceholder } from "./FairExhibitorRailPlaceholder"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"

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
    <Carousel arrowHeight={FAIR_EXHIBITOR_IMAGE_HEIGHT}>
      {show.artworks.edges.map(({ artwork }, index) => {
        return (
          <FillwidthItem
            contextModule={ContextModule.fairRail}
            artwork={artwork}
            imageHeight={FAIR_EXHIBITOR_IMAGE_HEIGHT}
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
    </Carousel>
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
              ...FillwidthItem_artwork
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
          <FairExhibitorRailArtworksFragmentContainer {...rest} {...props} />
        )
      }}
    />
  )
}
