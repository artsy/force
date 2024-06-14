import {
  ActionType,
  ClickedArtistGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Box, Skeleton } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { Rail } from "Components/Rail/Rail"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { ArtistRelatedArtistsRail_artist$data } from "__generated__/ArtistRelatedArtistsRail_artist.graphql"
import { ArtistRelatedArtistsRailQuery } from "__generated__/ArtistRelatedArtistsRailQuery.graphql"
import {
  CellArtistFragmentContainer,
  CellArtistPlaceholder,
} from "Components/Cells/CellArtist"
import { FC } from "react"

interface ArtistRelatedArtistsRailProps {
  artist: ArtistRelatedArtistsRail_artist$data
}

const ArtistRelatedArtistsRail: FC<ArtistRelatedArtistsRailProps> = ({
  artist,
}) => {
  const tracking = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const relatedArtists = extractNodes(artist.related?.artistsConnection)

  if (relatedArtists.length === 0) {
    return null
  }

  return (
    <Box>
      <Rail
        title="Related Artists"
        alignItems="flex-start"
        getItems={() => {
          return relatedArtists.map((relatedArtist, index) => {
            return (
              <CellArtistFragmentContainer
                data-testid="related-artist"
                key={relatedArtist.internalID}
                artist={relatedArtist}
                onClick={() => {
                  const payload: ClickedArtistGroup = {
                    action: ActionType.clickedArtistGroup,
                    context_module: ContextModule.relatedArtistsRail,
                    context_page_owner_id: contextPageOwnerId,
                    context_page_owner_slug: contextPageOwnerSlug,
                    context_page_owner_type: contextPageOwnerType!,
                    destination_page_owner_id: relatedArtist.internalID,
                    destination_page_owner_slug: relatedArtist.slug,
                    destination_page_owner_type: OwnerType.artist,
                    horizontal_slide_position: index + 1,
                    type: "thumbnail",
                  }

                  tracking.trackEvent(payload)
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
        related {
          artistsConnection(kind: MAIN, first: 12) {
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
        return [...new Array(12)].map((_, i) => {
          return <CellArtistPlaceholder key={i} />
        })
      }}
    />
  </Skeleton>
)

export const ArtistRelatedArtistsRailQueryRenderer: FC<{
  slug: string
}> = ({ slug }) => {
  return (
    <SystemQueryRenderer<ArtistRelatedArtistsRailQuery>
      lazyLoad
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

        if (!props || !props.artist) {
          return PLACEHOLDER
        }

        return (
          <ArtistRelatedArtistsRailFragmentContainer artist={props.artist} />
        )
      }}
    />
  )
}
