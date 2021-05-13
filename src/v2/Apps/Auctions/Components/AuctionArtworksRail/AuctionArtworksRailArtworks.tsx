import React from "react"
import { Shelf } from "@artsy/palette"
import { QueryRenderer, createFragmentContainer, graphql } from "react-relay"
import { useAnalyticsContext, useSystemContext } from "v2/Artsy"
import { AuctionArtworksRailArtworksQuery } from "v2/__generated__/AuctionArtworksRailArtworksQuery.graphql"
import { AuctionArtworksRailArtworks_sale } from "v2/__generated__/AuctionArtworksRailArtworks_sale.graphql"
import { TabType } from "./AuctionArtworksRail"
import { AuctionArtworksRailPlaceholder } from "../AuctionArtworksRailPlaceholder"
import { useTracking } from "react-tracking"
import { AuthContextModule, clickedArtworkGroup } from "@artsy/cohesion"
import { tabTypeToContextModuleMap } from "../../Utils/tabTypeToContextModuleMap"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { extractNodes } from "v2/Utils/extractNodes"

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

  const nodes = extractNodes(sale.artworksConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <Shelf>
      {nodes.map((node, index) => {
        return (
          <ShelfArtworkFragmentContainer
            artwork={node}
            key={node.slug}
            contextModule={contextModule}
            hidePartnerName
            lazyLoad
            onClick={() => {
              trackEvent(
                clickedArtworkGroup({
                  contextModule,
                  // @ts-expect-error STRICT_NULL_CHECK
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
    </Shelf>
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
              ...ShelfArtwork_artwork @arguments(width: 200)
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
      //  @ts-expect-error STRICT_NULL_CHECK
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
          // @ts-expect-error STRICT_NULL_CHECK
          <AuctionArtworksRailArtworksFragmentContainer {...rest} {...props} />
        )
      }}
    />
  )
}
