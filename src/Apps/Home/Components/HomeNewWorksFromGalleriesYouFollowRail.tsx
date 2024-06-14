import { Skeleton } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useTracking } from "react-tracking"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection$data } from "__generated__/HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection.graphql"
import { HomeNewWorksFromGalleriesYouFollowRailQuery } from "__generated__/HomeNewWorksFromGalleriesYouFollowRailQuery.graphql"
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
  clickedEntityGroup,
} from "@artsy/cohesion"
import { Rail } from "Components/Rail/Rail"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"

interface HomeNewWorksFromGalleriesYouFollowRailProps {
  newWorksFromGalleriesYouFollowConnection: HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection$data
}

const HomeNewWorksFromGalleriesYouFollowRail: React.FC<HomeNewWorksFromGalleriesYouFollowRailProps> = ({
  newWorksFromGalleriesYouFollowConnection,
}) => {
  const { trackEvent } = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const artworks = extractNodes(newWorksFromGalleriesYouFollowConnection)

  if (!artworks || artworks?.length === 0) {
    return null
  }

  return (
    <Rail
      title="New Works from Galleries You Follow"
      viewAllLabel="View All Works"
      viewAllHref="/new-works-from-galleries-you-follow"
      viewAllOnClick={() => {
        trackEvent(
          clickedEntityGroup({
            contextModule: ContextModule.newWorksByGalleriesYouFollowRail,
            contextPageOwnerId,
            contextPageOwnerSlug,
            contextPageOwnerType: contextPageOwnerType!,
            destinationPageOwnerType: OwnerType.newWorksFromGalleriesYouFollow,
            type: "viewAll",
          })
        )
      }}
      getItems={() => {
        return artworks.map(artwork => (
          <ShelfArtworkFragmentContainer
            artwork={artwork}
            key={artwork.internalID}
            lazyLoad
            contextModule={ContextModule.newWorksByGalleriesYouFollowRail}
            onClick={() => {
              const trackingEvent: ClickedArtworkGroup = {
                action: ActionType.clickedArtworkGroup,
                context_module: ContextModule.newWorksByGalleriesYouFollowRail,
                context_page_owner_type: OwnerType.home,
                destination_page_owner_type: OwnerType.artwork,
                destination_page_owner_id: artwork.internalID,
                destination_page_owner_slug: artwork.slug,
                type: "thumbnail",
              }
              trackEvent(trackingEvent)
            }}
          />
        ))
      }}
    />
  )
}

export const HomeNewWorksFromGalleriesYouFollowRailFragmentContainer = createFragmentContainer(
  HomeNewWorksFromGalleriesYouFollowRail,
  {
    newWorksFromGalleriesYouFollowConnection: graphql`
      fragment HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection on ArtworkConnection {
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

export const HomeNewWorksFromGalleriesYouFollowRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  const { user } = useSystemContext()

  if (!user) {
    return null
  }

  return (
    <SystemQueryRenderer<HomeNewWorksFromGalleriesYouFollowRailQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeNewWorksFromGalleriesYouFollowRailQuery {
          me {
            newWorksFromGalleriesYouFollowConnection(first: 20) {
              ...HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection
            }
          }
        }
      `}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me) {
          return PLACEHOLDER
        }

        if (props.me.newWorksFromGalleriesYouFollowConnection) {
          return (
            <HomeNewWorksFromGalleriesYouFollowRailFragmentContainer
              newWorksFromGalleriesYouFollowConnection={
                props.me.newWorksFromGalleriesYouFollowConnection
              }
            />
          )
        }

        return null
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="New Works from Galleries You Follow"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return <ShelfArtworkPlaceholder key={i} index={i} />
        })
      }}
    />
  </Skeleton>
)
