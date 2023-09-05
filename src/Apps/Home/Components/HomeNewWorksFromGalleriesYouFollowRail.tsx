import { Shelf, Skeleton } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/useSystemContext"
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
} from "@artsy/cohesion"
import { Rail } from "Components/Rail/Rail"

interface HomeNewWorksFromGalleriesYouFollowRailProps {
  newWorksFromGalleriesYouFollowConnection: HomeNewWorksFromGalleriesYouFollowRail_newWorksFromGalleriesYouFollowConnection$data
}

const HomeNewWorksFromGalleriesYouFollowRail: React.FC<HomeNewWorksFromGalleriesYouFollowRailProps> = ({
  newWorksFromGalleriesYouFollowConnection,
}) => {
  const { trackEvent } = useTracking()

  const artworks = extractNodes(newWorksFromGalleriesYouFollowConnection)

  if (!artworks || artworks?.length === 0) {
    return null
  }

  return (
    <Rail
      title="New Works From Galleries You Follow"
      viewAllLabel="View All Works"
      viewAllHref="/collection/curators-picks-emerging"
      viewAllOnClick={() => {
        const trackingEvent: ClickedArtworkGroup = {
          action: ActionType.clickedArtworkGroup,
          context_module: ContextModule.troveArtworksRail,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_type: OwnerType.collection,
          destination_page_owner_id: "932d0b13-3cf1-46d1-8e49-18b186230347",
          destination_page_owner_slug: "curators-picks-emerging",
          type: "viewAll",
        }
        trackEvent(trackingEvent)
      }}
      getItems={() => {
        return artworks.map(artwork => (
          <ShelfArtworkFragmentContainer
            artwork={artwork}
            key={artwork.internalID}
            lazyLoad
            // TODO: add troveArtworksRail to the union type of auth context module
            // @ts-ignore
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

const PLACEHOLDER = (
  <Skeleton>
    <Shelf>
      {[...new Array(8)].map((_, i) => {
        return <ShelfArtworkPlaceholder key={i} index={i} />
      })}
    </Shelf>
  </Skeleton>
)

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
          return null
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
