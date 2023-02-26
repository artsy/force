import { Skeleton } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { HomeAuctionLotsRail_viewer$data } from "__generated__/HomeAuctionLotsRail_viewer.graphql"
import { HomeAuctionLotsRailQuery } from "__generated__/HomeAuctionLotsRailQuery.graphql"
import { extractNodes } from "Utils/extractNodes"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { Rail } from "Components/Rail"

interface HomeAuctionLotsRailProps {
  viewer: HomeAuctionLotsRail_viewer$data
}

const HomeAuctionLotsRail: React.FC<HomeAuctionLotsRailProps> = ({
  viewer,
}) => {
  const { trackEvent } = useTracking()

  const artworks = extractNodes(viewer.artworksConnection)

  if (artworks.length === 0) {
    return null
  }

  return (
    <Rail
      title="Auction Lots"
      countLabel={artworks.length}
      viewAllLabel="View All Auctions"
      viewAllHref="/auctions"
      viewAllOnClick={() => {
        const trackingEvent: ClickedArtworkGroup = {
          action: ActionType.clickedArtworkGroup,
          context_module: ContextModule.auctionLots,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_type: OwnerType.auctions,
          type: "viewAll",
        }
        trackEvent(trackingEvent)
      }}
      getItems={() => {
        return artworks.map(artwork => {
          return (
            <ShelfArtworkFragmentContainer
              artwork={artwork}
              key={artwork.slug}
              contextModule={ContextModule.auctionLots}
              lazyLoad
              onClick={() => {
                const trackingEvent: ClickedArtworkGroup = {
                  action: ActionType.clickedArtworkGroup,
                  context_module: ContextModule.auctionLots,
                  context_page_owner_type: OwnerType.home,
                  destination_page_owner_id: artwork.internalID,
                  destination_page_owner_slug: artwork.slug,
                  destination_page_owner_type: OwnerType.artwork,
                  type: "thumbnail",
                }
                trackEvent(trackingEvent)
              }}
            />
          )
        })
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Auction Lots"
      viewAllLabel="View All Auctions"
      viewAllHref="/auctions"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return <ShelfArtworkPlaceholder key={i} index={i} />
        })
      }}
    />
  </Skeleton>
)

export const HomeAuctionLotsRailFragmentContainer = createFragmentContainer(
  HomeAuctionLotsRail,
  {
    viewer: graphql`
      fragment HomeAuctionLotsRail_viewer on Viewer {
        artworksConnection(
          forSale: true
          first: 50
          geneIDs: "our-top-auction-lots"
        ) {
          edges {
            node {
              ...ShelfArtwork_artwork
              internalID
              slug
              href
            }
          }
        }
      }
    `,
  }
)

export const HomeAuctionLotsRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeAuctionLotsRailQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeAuctionLotsRailQuery {
          viewer {
            ...HomeAuctionLotsRail_viewer
          }
        }
      `}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return PLACEHOLDER
        }

        if (props.viewer) {
          return <HomeAuctionLotsRailFragmentContainer viewer={props.viewer} />
        }

        return null
      }}
    />
  )
}
