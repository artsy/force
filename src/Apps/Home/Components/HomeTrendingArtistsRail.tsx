import { Skeleton } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useTracking } from "react-tracking"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { HomeTrendingArtistsRail_viewer$data } from "__generated__/HomeTrendingArtistsRail_viewer.graphql"
import { HomeTrendingArtistsRailQuery } from "__generated__/HomeTrendingArtistsRailQuery.graphql"
import { extractNodes } from "Utils/extractNodes"
import {
  ActionType,
  ClickedArtistGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Rail } from "Components/Rail/Rail"
import {
  CellArtistFragmentContainer,
  CellArtistPlaceholder,
} from "Components/Cells/CellArtist"

interface HomeTrendingArtistsRailProps {
  viewer: HomeTrendingArtistsRail_viewer$data
}

const HomeTrendingArtistsRail: React.FC<HomeTrendingArtistsRailProps> = ({
  viewer,
}) => {
  const { trackEvent } = useTracking()

  const artists = extractNodes(viewer.curatedTrendingArtists)

  if (artists.length === 0) {
    return null
  }

  return (
    <Rail
      alignItems="flex-start"
      title="Trending Artists on Artsy"
      viewAllLabel="View All Artists"
      viewAllHref="/artists"
      viewAllOnClick={() => {
        const trackingEvent: ClickedArtistGroup = {
          action: ActionType.clickedArtistGroup,
          context_module: ContextModule.trendingArtistsRail,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_type: OwnerType.artists,
          type: "viewAll",
        }
        trackEvent(trackingEvent)
      }}
      getItems={() => {
        return artists.map(artist => {
          return (
            <CellArtistFragmentContainer
              key={artist.internalID}
              artist={artist}
              onClick={() => {
                const trackingEvent: ClickedArtistGroup = {
                  action: ActionType.clickedArtistGroup,
                  context_module: ContextModule.trendingArtistsRail,
                  context_page_owner_type: OwnerType.home,
                  destination_page_owner_id: artist.internalID,
                  destination_page_owner_slug: artist.slug,
                  destination_page_owner_type: OwnerType.artist,
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
      title="Trending Artists on Artsy"
      viewAllLabel="View All Artists"
      viewAllHref="/artists"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return <CellArtistPlaceholder key={i} />
        })
      }}
    />
  </Skeleton>
)

export const HomeTrendingArtistsRailFragmentContainer = createFragmentContainer(
  HomeTrendingArtistsRail,
  {
    viewer: graphql`
      fragment HomeTrendingArtistsRail_viewer on Viewer {
        curatedTrendingArtists(first: 20) {
          edges {
            node {
              ...CellArtist_artist
              internalID
              slug
            }
          }
        }
      }
    `,
  }
)

export const HomeTrendingArtistsRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeTrendingArtistsRailQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeTrendingArtistsRailQuery {
          viewer {
            ...HomeTrendingArtistsRail_viewer
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
            <HomeTrendingArtistsRailFragmentContainer viewer={props.viewer} />
          )
        }

        return null
      }}
    />
  )
}
