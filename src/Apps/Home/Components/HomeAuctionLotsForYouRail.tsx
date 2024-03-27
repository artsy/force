import { Shelf, Skeleton } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/useSystemContext"
import { useTracking } from "react-tracking"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
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

import { HomeAuctionLotsForYouRail_viewer$data } from "__generated__/HomeAuctionLotsForYouRail_viewer.graphql"
import { HomeAuctionLotsForYouRailQuery } from "__generated__/HomeAuctionLotsForYouRailQuery.graphql"
import { extractNodes } from "Utils/extractNodes"

interface HomeAuctionLotsForYouRailProps {
  viewer: HomeAuctionLotsForYouRail_viewer$data
}

const HomeAuctionLotsForYouRail: React.FC<HomeAuctionLotsForYouRailProps> = ({
  viewer,
}) => {
  const { trackEvent } = useTracking()

  const artworks = extractNodes(viewer.artworksConnection)

  if (artworks.length === 0) {
    return null
  }

  return (
    <Shelf>
      {artworks.map(artwork => {
        return (
          <ShelfArtworkFragmentContainer
            artwork={artwork}
            key={artwork.slug}
            contextModule={ContextModule.auctionLots}
            lazyLoad
            onClick={() => {
              //TODO: add tracking for Auction Lots For You
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
      })}
    </Shelf>
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Shelf>
      {[...new Array(8)].map((_, i) => {
        return <ShelfArtworkPlaceholder key={i} index={i} />
      })}
    </Shelf>
  </Skeleton>
)

//TODO: get recommended auction lots
export const HomeAuctionLotsForYouRailFragmentContainer = createFragmentContainer(
  HomeAuctionLotsForYouRail,
  {
    viewer: graphql`
      fragment HomeAuctionLotsForYouRail_viewer on Viewer {
        artworksConnection(
          forSale: true
          first: 20
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

export const HomeAuctionLotsForYouRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeAuctionLotsForYouRailQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeAuctionLotsForYouRailQuery {
          viewer {
            ...HomeAuctionLotsForYouRail_viewer
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
          return (
            <HomeAuctionLotsForYouRailFragmentContainer viewer={props.viewer} />
          )
        }

        return null
      }}
    />
  )
}
