import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import { Rail } from "Components/Rail/Rail"
import { SystemContext } from "System/Contexts/SystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { ContextModule } from "@artsy/cohesion"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import type { RecentlyViewed_me$data } from "__generated__/RecentlyViewed_me.graphql"
import type { RecentlyViewedQuery } from "__generated__/RecentlyViewedQuery.graphql"
import type * as React from "react"
import { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { RecentlyViewedPlaceholder } from "./RecentlyViewedPlaceholder"

export interface RecentlyViewedProps {
  me: RecentlyViewed_me$data
}

export const RecentlyViewed: React.FC<
  React.PropsWithChildren<RecentlyViewedProps>
> = ({ me }) => {
  const tracking = useTracking()

  if (!me) return null

  const trackClick = () => {
    tracking.trackEvent({
      type: DeprecatedSchema.Type.Thumbnail,
      action_type: DeprecatedSchema.ActionType.Click,
      context_module: DeprecatedSchema.ContextModule.RecentlyViewedArtworks,
    })
  }

  const artworks = extractNodes(me.recentlyViewedArtworksConnection)

  if (artworks.length === 0) return null

  return (
    <Rail
      title="Recently Viewed"
      getItems={() => {
        return artworks.map(artwork => {
          return (
            <ShelfArtworkFragmentContainer
              key={artwork.id}
              lazyLoad={true}
              artwork={artwork}
              onClick={trackClick}
              contextModule={ContextModule.recentlyViewedRail}
            />
          )
        })
      }}
    />
  )
}

export const RecentlyViewedFragmentContainer = createFragmentContainer(
  RecentlyViewed,
  {
    me: graphql`
      fragment RecentlyViewed_me on Me {
        recentlyViewedArtworksConnection(first: 20) {
          edges {
            node {
              id
              ...ShelfArtwork_artwork
            }
          }
        }
      }
    `,
  }
)

export const RecentlyViewedQueryRenderer = () => {
  const { user, relayEnvironment } = useContext(SystemContext)

  if (!user) return null

  return (
    <SystemQueryRenderer<RecentlyViewedQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query RecentlyViewedQuery {
          me {
            ...RecentlyViewed_me
          }
        }
      `}
      placeholder={<RecentlyViewedPlaceholder />}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return <RecentlyViewedPlaceholder />
        }

        return props.me ? (
          <RecentlyViewedFragmentContainer me={props.me} />
        ) : null
      }}
      cacheConfig={{
        force: true,
      }}
    />
  )
}
