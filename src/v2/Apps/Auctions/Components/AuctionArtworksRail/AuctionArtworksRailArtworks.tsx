import React from "react"
import { Box } from "@artsy/palette"
import { QueryRenderer, createFragmentContainer, graphql } from "react-relay"
import { useAnalyticsContext, useSystemContext } from "v2/Artsy"
import { AuctionArtworksRailArtworksQuery } from "v2/__generated__/AuctionArtworksRailArtworksQuery.graphql"
import { AuctionArtworksRailArtworks_sale } from "v2/__generated__/AuctionArtworksRailArtworks_sale.graphql"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { AUCTION_ARTWORKS_IMAGE_HEIGHT, TabType } from "./AuctionArtworksRail"
import { AuctionArtworksRailPlaceholder } from "../AuctionArtworksRailPlaceholder"
import { useTracking } from "react-tracking"
import { clickedArtworkGroup } from "@artsy/cohesion"
import { tabTypeToContextModuleMap } from "../../Utils/tabTypeToContextModuleMap"

export interface AuctionArtworksRailArtworksProps {
  sale: AuctionArtworksRailArtworks_sale
  tabType: TabType
}

const AuctionArtworksRailArtworks: React.FC<AuctionArtworksRailArtworksProps> = ({
  sale,
  tabType,
}) => {
  const tracking = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()
  const contextModule = tabTypeToContextModuleMap[tabType]

  const AUCTION_ARTWORKS_RAIL_HEIGHT = 233

  if (sale.artworksConnection.edges.length === 0) {
    return null
  }

  return (
    <Box height={AUCTION_ARTWORKS_RAIL_HEIGHT}>
      <Carousel arrowHeight={AUCTION_ARTWORKS_IMAGE_HEIGHT}>
        {sale.artworksConnection.edges.map(({ node }, index) => {
          return (
            <FillwidthItem
              key={index}
              contextModule={contextModule}
              artwork={node}
              imageHeight={AUCTION_ARTWORKS_IMAGE_HEIGHT}
              hidePartnerName
              lazyLoad
              onClick={() => {
                tracking.trackEvent(
                  clickedArtworkGroup({
                    contextModule,
                    contextPageOwnerType,
                    artworkID: node.internalID,
                    artworkSlug: node.slug,
                    horizontalSlidePosition: index,
                  })
                )
              }}
            />
          )
        })}
      </Carousel>
    </Box>
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
  tabType: TabType
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
