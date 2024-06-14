import { Shelf, Skeleton } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useTracking } from "react-tracking"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { HomeNewWorksForYouRail_artworksForUser$data } from "__generated__/HomeNewWorksForYouRail_artworksForUser.graphql"
import { HomeNewWorksForYouRailQuery } from "__generated__/HomeNewWorksForYouRailQuery.graphql"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { extractNodes } from "Utils/extractNodes"
import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"

interface HomeNewWorksForYouRailProps {
  artworksForUser: HomeNewWorksForYouRail_artworksForUser$data
}

const HomeNewWorksForYouRail: React.FC<HomeNewWorksForYouRailProps> = ({
  artworksForUser,
}) => {
  const { trackEvent } = useTracking()

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
            contextModule={ContextModule.newWorksForYouRail}
            lazyLoad
            onClick={() => {
              const trackingEvent: ClickedArtworkGroup = {
                action: ActionType.clickedArtworkGroup,
                context_module: ContextModule.newWorksForYouRail,
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

export const HomeNewWorksForYouRailFragmentContainer = createFragmentContainer(
  HomeNewWorksForYouRail,
  {
    artworksForUser: graphql`
      fragment HomeNewWorksForYouRail_artworksForUser on ArtworkConnection {
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

export const HomeNewWorksForYouRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeNewWorksForYouRailQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeNewWorksForYouRailQuery {
          artworksForUser(
            includeBackfill: true
            first: 20
            maxWorksPerArtist: 3
            version: "C"
          ) {
            ...HomeNewWorksForYouRail_artworksForUser
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
            <HomeNewWorksForYouRailFragmentContainer
              artworksForUser={props.artworksForUser}
            />
          )
        }

        return null
      }}
    />
  )
}
