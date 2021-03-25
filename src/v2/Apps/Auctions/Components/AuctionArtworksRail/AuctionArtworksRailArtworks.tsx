import React from "react"
import { QueryRenderer, createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/Artsy"
import { AuctionArtworksRailArtworksQuery } from "v2/__generated__/AuctionArtworksRailArtworksQuery.graphql"
import { AuctionArtworksRailArtworks_sale } from "v2/__generated__/AuctionArtworksRailArtworks_sale.graphql"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
// import {
//   ActionType,
//   ClickedArtworkGroup,
//   ContextModule,
//   OwnerType,
// } from "@artsy/cohesion"
import {
  AUCTION_ARTWORKS_RAIL_HEIGHT,
  AUCTION_ARTWORKS_IMAGE_HEIGHT,
} from "./AuctionArtworksRail"
import { AuctionArtworksRailPlaceholder } from "./AuctionArtworksRailPlaceholder"
// import { useTracking } from "react-tracking"
// import { useAnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"

export interface AuctionArtworksRailArtworksProps {
  sale: AuctionArtworksRailArtworks_sale
}

const AuctionArtworksRailArtworks: React.FC<AuctionArtworksRailArtworksProps> = ({
  sale,
}) => {
  // const tracking = useTracking()

  // const {
  //   contextPageOwnerId,
  //   contextPageOwnerSlug,
  //   contextPageOwnerType,
  // } = useAnalyticsContext()

  // const clickedFairArtworkData = ({
  //   artworkID,
  //   artworkSlug,
  //   carouselIndex,
  // }): ClickedArtworkGroup => {
  //   return {
  //     context_module: ContextModule.galleryBoothRail,
  //     context_page_owner_type: contextPageOwnerType,
  //     context_page_owner_id: contextPageOwnerId,
  //     context_page_owner_slug: contextPageOwnerSlug,
  //     destination_page_owner_type: OwnerType.artwork,
  //     destination_page_owner_id: artworkID,
  //     destination_page_owner_slug: artworkSlug,
  //     horizontal_slide_position: carouselIndex,
  //     type: "thumbnail",
  //     action: ActionType.clickedArtworkGroup,
  //   }
  // }

  return (
    /* <Carousel arrowHeight={AUCTION_ARTWORKS_IMAGE_HEIGHT}>
            {auction.artworksConnection.edges.map(({ node }, index) => {
              return (
                <FillwidthItem
                  contextModule={null as any}
                  artwork={node}
                  imageHeight={AUCTION_ARTWORKS_IMAGE_HEIGHT}
                  hidePartnerName
                  lazyLoad
                />
              )
            })}
          </Carousel> */

    <Carousel arrowHeight={AUCTION_ARTWORKS_RAIL_HEIGHT}>
      {sale.artworksConnection.edges.map(({ node }, index) => {
        return (
          <FillwidthItem
            key={index}
            // contextModule={ContextModule.}
            artwork={node}
            imageHeight={AUCTION_ARTWORKS_IMAGE_HEIGHT}
            hidePartnerName
            lazyLoad
            onClick={() => {
              // tracking.trackEvent(
              //   clickedFairArtworkData({
              //     artworkID: artwork.internalID,
              //     artworkSlug: artwork.slug,
              //     carouselIndex: index,
              //   })
              // )
            }}
          />
        )
      })}
    </Carousel>
  )
}

export const AuctionArtworksRailArtworksFragmentContainer = createFragmentContainer(
  AuctionArtworksRailArtworks,
  {
    sale: graphql`
      fragment AuctionArtworksRailArtworks_sale on Sale {
        artworksConnection(first: 20) {
          edges {
            node {
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

export const AuctionArtworksRailArtworksQueryRenderer: React.FC<{
  id: string
}> = ({ id, ...rest }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<AuctionArtworksRailArtworksQuery>
      environment={relayEnvironment}
      query={graphql`
        query AuctionArtworksRailArtworksQuery($id: String!) {
          sale(id: $id) {
            ...AuctionArtworksRailArtworks_sale
          }
        }
      `}
      variables={{ id }}
      render={({ error, props }) => {
        if (error || !props) return <AuctionArtworksRailPlaceholder />
        return (
          <AuctionArtworksRailArtworksFragmentContainer {...rest} {...props} />
        )
      }}
    />
  )
}
