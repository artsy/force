import { ContextModule } from "@artsy/cohesion"
import { Box, Button, Flex, Text } from "@artsy/palette"
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

    return (
      <Box mt={6} data-test={ContextModule.relatedArtistsRail}>
        <Flex flexDirection="column" alignItems="center">
          <Text variant="title" color="black100" mb={2} textAlign="center">
            Related artists
          </Text>
        </Flex>
        <Flex flexWrap="wrap" mr={-2} width="100%">
          {artist.related.artistsConnection.edges.map(({ node }, index) => {
            return (
              <Box pr={2} mb={[1, 4]} width={["100%", "25%"]} key={index}>
                <ArtistCard
                  lazyLoad
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
              </Box>
            )
          })}
        </Flex>

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
    <Flex flexDirection="column" alignItems="center">
      <Button
        variant="secondaryOutline"
        mb={3}
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
