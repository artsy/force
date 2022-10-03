import {
  Box,
  Spacer,
  Skeleton,
  SkeletonText,
  SkeletonBox,
} from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { HomeAuctionLotsRail_viewer$data } from "__generated__/HomeAuctionLotsRail_viewer.graphql"
import { HomeAuctionLotsRailQuery } from "__generated__/HomeAuctionLotsRailQuery.graphql"
import { extractNodes } from "Utils/extractNodes"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
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
              // @ts-ignore RELAY UPGRADE 13
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
          return (
            <Box width={200} key={i}>
              <SkeletonBox width={200} height={[200, 300, 250, 275][i % 4]} />
              <Spacer mt={1} />
              <SkeletonText variant="sm-display">Artist Name</SkeletonText>
              <SkeletonText variant="sm-display">Artwork Title</SkeletonText>
              <SkeletonText variant="xs">Partner</SkeletonText>
              <SkeletonText variant="xs">Price</SkeletonText>
            </Box>
          )
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
              ...ShelfArtwork_artwork @arguments(width: 210)
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
          // @ts-ignore RELAY UPGRADE 13
          return <HomeAuctionLotsRailFragmentContainer viewer={props.viewer} />
        }

        return null
      }}
    />
  )
}
