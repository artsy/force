import { ContextModule } from "@artsy/cohesion"
import { Shelf, Text } from "@artsy/palette"
import { RecentlyViewed_me } from "v2/__generated__/RecentlyViewed_me.graphql"
import { RecentlyViewedQuery } from "v2/__generated__/RecentlyViewedQuery.graphql"
import { useSystemContext } from "v2/System"
import { useTracking } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import { SystemQueryRenderer as QueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { ShelfArtworkFragmentContainer } from "../Artwork/ShelfArtwork"
import { RecentlyViewedPlaceholder } from "./RecentlyViewedPlaceholder"

export interface RecentlyViewedProps {
  me: RecentlyViewed_me
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
    <>
      <Text variant="lg" mb={2}>
        Recently viewed
      </Text>

      <Shelf showProgress={false}>
        {artworks.map(artwork => {
          return (
            <ShelfArtworkFragmentContainer
              key={artwork.id}
              lazyLoad={true}
              artwork={artwork}
              onClick={trackClick}
              contextModule={ContextModule.recentlyViewedRail}
            />
          )
        })}
      </Shelf>
    </>
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
  const { user, relayEnvironment } = useSystemContext()

  if (!user) return null

  return (
    <QueryRenderer<RecentlyViewedQuery>
      environment={relayEnvironment}
      query={graphql`
        query RecentlyViewedQuery {
          me {
            ...RecentlyViewed_me
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return <RecentlyViewedPlaceholder />
        }

        return <RecentlyViewedFragmentContainer {...props} />
      }}
    />
  )
}
