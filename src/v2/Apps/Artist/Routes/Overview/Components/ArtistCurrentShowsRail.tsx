import { clickedEntityGroup, ContextModule, OwnerType } from "@artsy/cohesion"
import { Box, Skeleton } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { Rail } from "v2/Components/Rail"
import {
  AnalyticsSchema,
  useAnalyticsContext,
  useSystemContext,
} from "v2/System"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistCurrentShowsRail_artist } from "v2/__generated__/ArtistCurrentShowsRail_artist.graphql"
import { ArtistCurrentShowsRailQuery } from "v2/__generated__/ArtistCurrentShowsRailQuery.graphql"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import {
  CellShowFragmentContainer,
  CellShowPlaceholder,
} from "v2/Components/Cells/CellShow"

interface ArtistCurrentShowsRailProps {
  artist: ArtistCurrentShowsRail_artist
}

const ArtistCurrentShowsRail: React.FC<ArtistCurrentShowsRailProps> = ({
  artist,
}) => {
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const shows = extractNodes(artist.showsConnection)

  if (shows.length === 0) {
    return null
  }

  return (
    <Rail
      title={`Shows Featuring ${artist.name}`}
      alignItems="flex-start"
      viewAllLabel="View All Shows"
      viewAllHref={`/artist/${artist.slug}/shows`}
      viewAllOnClick={() => {
        tracking.trackEvent(
          clickedEntityGroup({
            contextModule: ContextModule.currentShowsRail,
            contextPageOwnerId,
            contextPageOwnerSlug,
            contextPageOwnerType: contextPageOwnerType!,
            destinationPageOwnerType: OwnerType.artist,
            destinationPageOwnerId: artist.internalID,
            destinationPageOwnerSlug: artist.slug,
            type: "viewAll",
          })
        )
      }}
      getItems={() => {
        return shows.map((show, index) => {
          return (
            <CellShowFragmentContainer
              key={show.internalID}
              show={show}
              onClick={() => {
                tracking.trackEvent({
                  action_type: AnalyticsSchema.ActionType.Click,
                  contextModule: ContextModule.currentShowsRail,
                  contextPageOwnerId,
                  contextPageOwnerSlug,
                  contextPageOwnerType,
                  destination_path: show.href,
                  destinationPageOwnerId: show.internalID,
                  destinationPageOwnerSlug: show.slug,
                  destinationPageOwnerType: OwnerType.artwork,
                  horizontalSlidePosition: index + 1,
                  subject: "showCarouselSlide",
                  type: "thumbnail",
                })
              }}
            />
          )
        })
      }}
    />
  )
}

export const ArtistCurrentShowsRailFragmentContainer = createFragmentContainer(
  ArtistCurrentShowsRail,
  {
    artist: graphql`
      fragment ArtistCurrentShowsRail_artist on Artist {
        internalID
        name
        slug
        showsConnection(first: 5, sort: END_AT_ASC, status: "running") {
          edges {
            node {
              ...CellShow_show
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

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Shows"
      viewAllLabel="View All Shows"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return <CellShowPlaceholder key={i} />
        })
      }}
    />
  </Skeleton>
)

export const ArtistCurrentShowsRailQueryRenderer: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <Box data-test="ArtistCurrentShowsRailQueryRenderer">
      <SystemQueryRenderer<ArtistCurrentShowsRailQuery>
        lazyLoad
        environment={relayEnvironment}
        variables={{ slug }}
        placeholder={PLACEHOLDER}
        query={graphql`
          query ArtistCurrentShowsRailQuery($slug: String!) {
            artist(id: $slug) {
              ...ArtistCurrentShowsRail_artist
            }
          }
        `}
        render={({ error, props }) => {
          if (error) {
            console.error(error)
            return null
          }
          if (!props) {
            return PLACEHOLDER
          }
          if (props.artist) {
            return (
              <ArtistCurrentShowsRailFragmentContainer artist={props.artist} />
            )
          }
        }}
      />
    </Box>
  )
}
