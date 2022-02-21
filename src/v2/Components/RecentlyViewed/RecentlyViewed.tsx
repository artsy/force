import { ContextModule } from "@artsy/cohesion"
import { RecentlyViewed_me$data } from "v2/__generated__/RecentlyViewed_me.graphql"
import { RecentlyViewedQuery } from "v2/__generated__/RecentlyViewedQuery.graphql"
import { SystemContext } from "v2/System"
import { useTracking } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { useContext } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { ShelfArtworkFragmentContainer } from "../Artwork/ShelfArtwork"
import { RecentlyViewedPlaceholder } from "./RecentlyViewedPlaceholder"
import { Rail } from "../Rail"

export interface RecentlyViewedProps {
  me: RecentlyViewed_me$data
}

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ me }) => {
  const tracking = useTracking()

  if (!me) return null

  const trackClick = () => {
    tracking.trackEvent({
      type: Schema.Type.Thumbnail,
      action_type: Schema.ActionType.Click,
      context_module: Schema.ContextModule.RecentlyViewedArtworks,
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

        return <RecentlyViewedFragmentContainer me={props.me!} />
      }}
      cacheConfig={{
        force: true,
      }}
    />
  )
}
