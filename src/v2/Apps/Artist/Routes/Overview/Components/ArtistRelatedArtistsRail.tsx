import { ContextModule, OwnerType } from "@artsy/cohesion"
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
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistRelatedArtistsRail_artist } from "v2/__generated__/ArtistRelatedArtistsRail_artist.graphql"
import { ArtistRelatedArtistsRailQuery } from "v2/__generated__/ArtistRelatedArtistsRailQuery.graphql"
import {
  CellArtistFragmentContainer,
  CellArtistPlaceholder,
} from "v2/Components/Cells/CellArtist"

interface ArtistRelatedArtistsRailProps {
  artist: ArtistRelatedArtistsRail_artist
}

const ArtistRelatedArtistsRail: React.FC<ArtistRelatedArtistsRailProps> = ({
  artist,
}) => {
  const tracking = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const artists = extractNodes(artist?.related?.artistsConnection)

  if (artists.length === 0) {
    return null
  }

  return (
    <Box data-test="relatedArtistsRail">
      <Rail
        title="Related Artists"
        alignItems="flex-start"
        getItems={() => {
          return artists.map((artist, index) => {
            return (
              <CellArtistFragmentContainer
                artist={artist}
                onClick={() => {
                  tracking.trackEvent({
                    action_type: AnalyticsSchema.ActionType.Click,
                    contextModule: ContextModule.relatedArtistsRail,
                    contextPageOwnerId,
                    contextPageOwnerSlug,
                    contextPageOwnerType,
                    destination_path: artist.href,
                    destinationPageOwnerId: artist.internalID,
                    destinationPageOwnerSlug: artist.slug,
                    destinationPageOwnerType: OwnerType.artist,
                    horizontalSlidePosition: index + 1,
                    type: "thumbnail",
                  })
                }}
              />
            )
          })
        }}
      />
    </Box>
  )
}

export const ArtistRelatedArtistsRailFragmentContainer = createFragmentContainer(
  ArtistRelatedArtistsRail,
  {
    artist: graphql`
      fragment ArtistRelatedArtistsRail_artist on Artist {
        name
        href
        related {
          artistsConnection(kind: MAIN, first: 20) {
            edges {
              node {
                ...CellArtist_artist
                internalID
                slug
                href
              }
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
      title="Related Artists"
      viewAllLabel="View All Artists"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return <CellArtistPlaceholder key={i} />
        })
      }}
    />
  </Skeleton>
)

export const ArtistRelatedArtistsRailQueryRenderer: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <Box data-test="ArtistRelatedArtistsRailQueryRenderer">
      <SystemQueryRenderer<ArtistRelatedArtistsRailQuery>
        lazyLoad
        environment={relayEnvironment}
        variables={{ slug }}
        placeholder={PLACEHOLDER}
        query={graphql`
          query ArtistRelatedArtistsRailQuery($slug: String!) {
            artist(id: $slug) {
              ...ArtistRelatedArtistsRail_artist
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
              <ArtistRelatedArtistsRailFragmentContainer
                artist={props.artist}
              />
            )
          }
        }}
      />
    </Box>
  )
}
