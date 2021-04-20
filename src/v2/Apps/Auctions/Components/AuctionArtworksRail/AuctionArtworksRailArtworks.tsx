import React from "react"
import { Box } from "@artsy/palette"
import { QueryRenderer, createFragmentContainer, graphql } from "react-relay"
import { useAnalyticsContext, useSystemContext } from "v2/Artsy"
import { AuctionArtworksRailArtworksQuery } from "v2/__generated__/AuctionArtworksRailArtworksQuery.graphql"
import { AuctionArtworksRailArtworks_sale } from "v2/__generated__/AuctionArtworksRailArtworks_sale.graphql"
import { SwiperWithProgress } from "v2/Components/Carousel"
import { TabType } from "./AuctionArtworksRail"
import { AuctionArtworksRailPlaceholder } from "../AuctionArtworksRailPlaceholder"
import { useTracking } from "react-tracking"
import { AuthContextModule, clickedArtworkGroup } from "@artsy/cohesion"
import { tabTypeToContextModuleMap } from "../../Utils/tabTypeToContextModuleMap"
import { CarouselArtworkFragmentContainer } from "v2/Components/Artwork/CarouselArtwork"

export interface AuctionArtworksRailArtworksProps {
  sale: AuctionArtworksRailArtworks_sale
  tabType: TabType
}

const AuctionArtworksRailArtworks: React.FC<AuctionArtworksRailArtworksProps> = ({
  sale,
  tabType,
}) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()
  const contextModule = tabTypeToContextModuleMap[tabType] as AuthContextModule

  if (sale.artworksConnection.edges.length === 0) {
    return null
  }

  return (
    <Box>
      <SwiperWithProgress>
        {sale.artworksConnection.edges.map(({ node }, index) => {
          return (
            <CarouselArtworkFragmentContainer
              artwork={node}
              key={node.slug}
              contextModule={contextModule}
              hidePartnerName
              onClick={() => {
                trackEvent(
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
      </SwiperWithProgress>
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
              ...CarouselArtwork_artwork @arguments(width: 200)
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
