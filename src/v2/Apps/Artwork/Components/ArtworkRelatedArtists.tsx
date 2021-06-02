import { ContextModule } from "@artsy/cohesion"
import {
  Box,
  Button,
  Column,
  Flex,
  GridColumns,
  Spacer,
  Text,
} from "@artsy/palette"
import { ArtworkRelatedArtists_artwork } from "v2/__generated__/ArtworkRelatedArtists_artwork.graphql"
import { hideGrid } from "v2/Apps/Artwork/Components/OtherWorks"
import { track, useTracking } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { ArtistCardFragmentContainer as ArtistCard } from "v2/Components/ArtistCard"
import React, { useState } from "react"
import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import createLogger from "v2/Utils/logger"
import { extractNodes } from "v2/Utils/extractNodes"

const logger = createLogger("ArtworkRelatedArtists.tsx")

export interface ArtworkRelatedArtistsProps {
  artwork: ArtworkRelatedArtists_artwork
  relay: RelayPaginationProp
}

const PAGE_SIZE = 4

export const ArtworkRelatedArtists: React.FC<ArtworkRelatedArtistsProps> = track()(
  props => {
    const { trackEvent } = useTracking()

    const [fetchingNextPage, setFetchingNextPage] = useState(false)

    const {
      artwork: { artist },
      relay,
    } = props

    // @ts-expect-error STRICT_NULL_CHECK
    if (hideGrid(artist.related.artistsConnection)) {
      return null
    }

    const fetchData = () => {
      if (!relay.hasMore() || relay.isLoading()) {
        return
      }

      setFetchingNextPage(true)

      relay.loadMore(PAGE_SIZE, error => {
        if (error) {
          logger.error(error)
        }
        setFetchingNextPage(false)
      })
    }

    const artists = extractNodes(artist?.related?.artistsConnection)

    return (
      <Box data-test={ContextModule.relatedArtistsRail}>
        <Text variant="lg">Related artists</Text>

        <Spacer mt={4} />

        <GridColumns>
          {artists.map((node, index) => {
            return (
              <Column key={index} span={[12, 6, 3, 3]}>
                <ArtistCard
                  artist={node}
                  contextModule={ContextModule.relatedArtistsRail}
                  onClick={() => {
                    trackEvent({
                      context_module: Schema.ContextModule.RelatedArtists,
                      type: Schema.Type.ArtistCard,
                      action_type: Schema.ActionType.Click,
                    })
                  }}
                />
              </Column>
            )
          })}
        </GridColumns>

        <Spacer mt={4} />

        {relay.hasMore() && (
          <ShowMoreButton onClick={fetchData} loading={fetchingNextPage} />
        )}
      </Box>
    )
  }
)

const ShowMoreButton: React.FC<{ onClick: () => void; loading: boolean }> = ({
  onClick,
  loading,
}) => {
  return (
    <Flex justifyContent="center">
      <Button
        variant="secondaryOutline"
        size="small"
        onClick={onClick}
        loading={loading}
      >
        Show more
      </Button>
    </Flex>
  )
}

export const ArtworkRelatedArtistsPaginationContainer = createPaginationContainer(
  ArtworkRelatedArtists,
  {
    artwork: graphql`
      fragment ArtworkRelatedArtists_artwork on Artwork
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 4 }
          cursor: { type: "String", defaultValue: "" }
        ) {
        slug
        artist {
          href
          related {
            artistsConnection(kind: MAIN, first: $count, after: $cursor)
              @connection(key: "ArtworkRelatedArtists_artistsConnection") {
              pageInfo {
                hasNextPage
              }
              edges {
                node {
                  ...ArtistCard_artist
                }
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      // @ts-expect-error STRICT_NULL_CHECK
      return props.artwork.artist.related.artistsConnection
    },
    getFragmentVariables(prevVars, count) {
      return {
        ...prevVars,
        count,
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        ...fragmentVariables,
        count,
        cursor,
        artworkID: props.artwork.slug,
      }
    },
    query: graphql`
      query ArtworkRelatedArtistsPaginationQuery(
        $count: Int!
        $cursor: String
        $artworkID: String!
      ) {
        artwork(id: $artworkID) {
          ...ArtworkRelatedArtists_artwork
            @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
)
