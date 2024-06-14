import { Box, Skeleton } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import {
  ActionType,
  ClickedArtistSeriesGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { extractNodes } from "Utils/extractNodes"
import { Rail } from "Components/Rail/Rail"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ArtistSeriesRail_artist$data } from "__generated__/ArtistSeriesRail_artist.graphql"
import { ArtistSeriesRailQuery } from "__generated__/ArtistSeriesRailQuery.graphql"
import {
  CellArtistSeriesFragmentContainer,
  CellArtistSeriesPlaceholder,
} from "Components/Cells/CellArtistSeries"
import { FC } from "react"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"

interface ArtistSeriesProps {
  artist: ArtistSeriesRail_artist$data
  contextModule: ContextModule
  title?: string
}

const ArtistSeriesRail: FC<ArtistSeriesProps> = ({
  artist,
  contextModule,
  title,
}) => {
  const { trackEvent } = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  if (!artist) return null

  const artistSeries = extractNodes(artist.artistSeriesConnection)

  if (artistSeries.length === 0) return null

  return (
    <Rail
      title={title ?? "Artist Series"}
      viewAllLabel="View All"
      viewAllHref={`${artist.href}/series`}
      getItems={() => {
        return artistSeries.map((series, i) => {
          return (
            <CellArtistSeriesFragmentContainer
              key={series.internalID}
              artistSeries={series}
              onClick={() => {
                const payload: ClickedArtistSeriesGroup = {
                  action: ActionType.clickedArtistSeriesGroup,
                  context_module: contextModule,
                  context_page_owner_id: contextPageOwnerId,
                  context_page_owner_slug: contextPageOwnerSlug,
                  context_page_owner_type: contextPageOwnerType!,
                  curation_boost: series.featured,
                  destination_page_owner_id: series.internalID,
                  destination_page_owner_slug: series.slug,
                  destination_page_owner_type: OwnerType.artistSeries,
                  horizontal_slide_position: i,
                  type: "thumbnail",
                }

                trackEvent(payload)
              }}
            />
          )
        })
      }}
    />
  )
}

export const ArtistSeriesRailFragmentContainer = createFragmentContainer(
  ArtistSeriesRail,
  {
    artist: graphql`
      fragment ArtistSeriesRail_artist on Artist {
        href
        artistSeriesConnection(first: 12) {
          edges {
            node {
              ...CellArtistSeries_artistSeries
              internalID
              featured
              slug
            }
          }
        }
      }
    `,
  }
)

const ArtistSeriesRailPlaceholder = () => {
  return (
    <Skeleton>
      <Rail
        title="Artist Series"
        getItems={() => {
          return [...new Array(12)].map((_, i) => {
            return <CellArtistSeriesPlaceholder key={i} />
          })
        }}
      />
    </Skeleton>
  )
}

export const ArtistSeriesRailQueryRenderer: FC<{
  id: string
  title?: string
}> = ({ id, title }) => {
  return (
    <Box data-test="ArtistSeriesRailQueryRenderer">
      <SystemQueryRenderer<ArtistSeriesRailQuery>
        lazyLoad
        variables={{ id }}
        placeholder={<ArtistSeriesRailPlaceholder />}
        query={graphql`
          query ArtistSeriesRailQuery($id: String!) {
            artist(id: $id) {
              ...ArtistSeriesRail_artist
            }
          }
        `}
        render={({ error, props }) => {
          if (error) {
            console.error(error)
            return null
          }

          if (!props?.artist) {
            return <ArtistSeriesRailPlaceholder />
          }

          return (
            <ArtistSeriesRailFragmentContainer
              artist={props.artist}
              title={title}
              contextModule={ContextModule.artistSeriesRail}
            />
          )
        }}
      />
    </Box>
  )
}
