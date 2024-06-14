import { Shelf, Skeleton } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useTracking } from "react-tracking"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import {
  ActionType,
  AuthContextModule,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"

import { HomeAuctionLotsForYouRail_artworksForUser$data } from "__generated__/HomeAuctionLotsForYouRail_artworksForUser.graphql"
import { HomeAuctionLotsForYouRailQuery } from "__generated__/HomeAuctionLotsForYouRailQuery.graphql"
import { extractNodes } from "Utils/extractNodes"

interface HomeAuctionLotsForYouRailProps {
  artworksForUser: HomeAuctionLotsForYouRail_artworksForUser$data
}

const HomeAuctionLotsForYouRail: React.FC<HomeAuctionLotsForYouRailProps> = ({
  artworksForUser,
}) => {
  const { trackEvent } = useTracking()
  const contextModule = ContextModule.lotsForYouRail as AuthContextModule

  const artworks = extractNodes(artworksForUser)

  if (!artworks || artworks?.length === 0) {
    return null
  }

  return (
    <Shelf>
      {artworks.map((artwork, index) => {
        if (!artwork) {
          return <></>
        }

        return (
          <ShelfArtworkFragmentContainer
            artwork={artwork}
            key={index}
            lazyLoad
            contextModule={contextModule}
            onClick={() => {
              const trackingEvent: ClickedArtworkGroup = {
                action: ActionType.clickedArtworkGroup,
                context_module: ContextModule.lotsForYouRail,
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

export const HomeAuctionLotsForYouRailFragmentContainer = createFragmentContainer(
  HomeAuctionLotsForYouRail,
  {
    artworksForUser: graphql`
      fragment HomeAuctionLotsForYouRail_artworksForUser on ArtworkConnection {
        edges {
          node {
            internalID
            slug
            ...ShelfArtwork_artwork
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
          artworksForUser(
            includeBackfill: true
            first: 20
            onlyAtAuction: true
          ) {
            ...HomeAuctionLotsForYouRail_artworksForUser
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

        if (props.artworksForUser) {
          return (
            <HomeAuctionLotsForYouRailFragmentContainer
              artworksForUser={props.artworksForUser}
            />
          )
        }

        return null
      }}
    />
  )
}
