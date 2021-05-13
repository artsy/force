import { Box, Button, Flex, Text } from "@artsy/palette"
import { ArtistRecommendations_artist } from "v2/__generated__/ArtistRecommendations_artist.graphql"
import { ArtistRecommendationsRendererQuery } from "v2/__generated__/ArtistRecommendationsRendererQuery.graphql"
import { SystemContext, useTracking } from "v2/Artsy"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import React, { useContext, useState } from "react"
import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import { get } from "v2/Utils/get"
import createLogger from "v2/Utils/logger"
import { RecommendedArtistFragmentContainer as RecommendedArtist } from "./RecommendedArtist"

const logger = createLogger("ArtistRecommendations.tsx")

interface ArtistRecommendationsProps {
  artist: ArtistRecommendations_artist
  relay: RelayPaginationProp
}

const PAGE_SIZE = 3

export const ArtistRecommendations: React.FC<ArtistRecommendationsProps> = ({
  artist,
  relay,
}) => {
  const [fetchingNextPage, setFetchingNextPage] = useState(false)

  // @ts-expect-error STRICT_NULL_CHECK
  const relatedArtists = get(
    artist,
    // @ts-expect-error STRICT_NULL_CHECK
    a => a.related.artistsConnection.edges,
    []
  ).map(edge => (
    // @ts-expect-error STRICT_NULL_CHECK
    <RecommendedArtist artist={edge.node} key={edge.node.id} fullBleedRail />
  ))

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
    <Box>
      <Text variant="subtitle" mb={2}>
        Related Artists
      </Text>

      {relatedArtists}

      {relay.hasMore() && (
        <ShowMoreButton onClick={fetchData} loading={fetchingNextPage} />
      )}
    </Box>
  )
}

const ShowMoreButton: React.FC<{ onClick: () => void; loading: boolean }> = ({
  onClick,
  loading,
}) => {
  const tracking = useTracking()

  return (
    <Flex flexDirection="column" alignItems="center">
      <Button
        my={4}
        variant="secondaryOutline"
        onClick={() => {
          tracking.trackEvent({
            action_type: Schema.ActionType.Click,
            context_module: Schema.ContextModule.RecommendedArtists,
            subject: "Show more",
          })
          onClick()
        }}
        loading={loading}
      >
        Show More
      </Button>
    </Flex>
  )
}

export const ArtistRecommendationsPaginationContainer = createPaginationContainer(
  ArtistRecommendations,
  {
    artist: graphql`
      fragment ArtistRecommendations_artist on Artist
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 3 }
          cursor: { type: "String", defaultValue: "" }
          minForsaleArtworks: { type: "Int", defaultValue: 7 }
        ) {
        slug
        related {
          artistsConnection(
            first: $count
            after: $cursor
            minForsaleArtworks: $minForsaleArtworks
          ) @connection(key: "ArtistRecommendations_artistsConnection") {
            edges {
              node {
                id
                ...RecommendedArtist_artist
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
      return props.artist.related.artistsConnection
    },
    getFragmentVariables(prevVars, count) {
      return {
        ...prevVars,
        count,
      }
    },
    getVariables(
      props: ArtistRecommendationsProps,
      { count, cursor },
      fragmentVariables
    ) {
      return {
        ...fragmentVariables,
        artistID: props.artist.slug,
        count,
        cursor,
      }
    },
    query: graphql`
      query ArtistRecommendationsPaginationQuery(
        $count: Int!
        $cursor: String
        $artistID: String!
      ) {
        artist(id: $artistID) {
          ...ArtistRecommendations_artist
            @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
)

export const ArtistRecommendationsQueryRenderer: React.FC<{
  artistID: string
}> = ({ artistID }) => {
  const { relayEnvironment } = useContext(SystemContext)
  return (
    <QueryRenderer<ArtistRecommendationsRendererQuery>
      environment={relayEnvironment}
      query={graphql`
        query ArtistRecommendationsRendererQuery($artistID: String!) {
          artist(id: $artistID) {
            ...ArtistRecommendations_artist
          }
        }
      `}
      variables={{ artistID }}
      render={renderWithLoadProgress(ArtistRecommendationsPaginationContainer)}
    />
  )
}
