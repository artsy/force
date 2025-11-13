import { hideGrid } from "Apps/Artwork/Components/OtherWorks"
import { EntityHeaderArtistFragmentContainer } from "Components/EntityHeaders/EntityHeaderArtist"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import createLogger from "Utils/logger"
import { ContextModule } from "@artsy/cohesion"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  Box,
  Button,
  Column,
  Flex,
  GridColumns,
  Skeleton,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import type { ArtworkRelatedArtists_artwork$data } from "__generated__/ArtworkRelatedArtists_artwork.graphql"
import type { ArtworkRelatedArtistsQuery } from "__generated__/ArtworkRelatedArtistsQuery.graphql"
import type * as React from "react"
import { useState } from "react"
import {
  createPaginationContainer,
  graphql,
  type RelayPaginationProp,
} from "react-relay"
import track, { useTracking } from "react-tracking"

const logger = createLogger("ArtworkRelatedArtists.tsx")

export interface ArtworkRelatedArtistsProps {
  artwork: ArtworkRelatedArtists_artwork$data
  relay: RelayPaginationProp
}

const PAGE_SIZE = 6

export const ArtworkRelatedArtists: React.FC<
  React.PropsWithChildren<ArtworkRelatedArtistsProps>
> = track()(props => {
  const { trackEvent } = useTracking()

  const [fetchingNextPage, setFetchingNextPage] = useState(false)

  const {
    artwork: { artist },
    relay,
  } = props

  if (hideGrid(artist?.related?.artistsConnection)) {
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
      <Text variant="lg-display">Related artists</Text>

      <Spacer y={4} />

      <GridColumns>
        {artists.map((node, index) => {
          return (
            <Column key={index} span={[12, 6, 4, 4]}>
              <EntityHeaderArtistFragmentContainer
                artist={node}
                onClick={() => {
                  trackEvent({
                    context_module:
                      DeprecatedSchema.ContextModule.RelatedArtists,
                    type: DeprecatedSchema.Type.ArtistCard,
                    action_type: DeprecatedSchema.ActionType.Click,
                  })
                }}
              />
            </Column>
          )
        })}
      </GridColumns>

      <Spacer y={4} />

      {relay.hasMore() && (
        <ShowMoreButton onClick={fetchData} loading={fetchingNextPage} />
      )}
    </Box>
  )
})

const ShowMoreButton: React.FC<
  React.PropsWithChildren<{ onClick: () => void; loading: boolean }>
> = ({ onClick, loading }) => {
  return (
    <Flex justifyContent="center">
      <Button onClick={onClick} loading={loading}>
        Show More
      </Button>
    </Flex>
  )
}

export const ArtworkRelatedArtistsPaginationContainer =
  createPaginationContainer(
    ArtworkRelatedArtists,
    {
      artwork: graphql`
        fragment ArtworkRelatedArtists_artwork on Artwork
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 6 }
          cursor: { type: "String", defaultValue: "" }
        ) {
          slug
          artist(shallow: true) {
            href
            related {
              artistsConnection(kind: MAIN, first: $count, after: $cursor)
                @connection(key: "ArtworkRelatedArtists_artistsConnection") {
                pageInfo {
                  hasNextPage
                }
                edges {
                  node {
                    ...EntityHeaderArtist_artist
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
        return props.artwork.artist?.related?.artistsConnection
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

const PLACEHOLDER = (
  <Skeleton>
    <Text variant="lg-display">Related artists</Text>

    <Spacer y={4} />

    <GridColumns>
      {[...new Array(4)].map((_node, index) => {
        return (
          <Column key={index} span={[12, 6, 3, 3]}>
            <Flex flexDirection="row">
              <Flex
                width="100%"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <SkeletonText variant="sm">Georges Braque</SkeletonText>
                  <SkeletonText variant="xs">French 1900-2000</SkeletonText>
                </Box>
                <Button variant="secondaryBlack" size="small">
                  Follow
                </Button>
              </Flex>
            </Flex>
          </Column>
        )
      })}
    </GridColumns>
  </Skeleton>
)

export const ArtworkRelatedArtistsQueryRenderer: React.FC<
  React.PropsWithChildren<{
    slug: string
  }>
> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <Box data-test="ArtworkRelatedArtistsQueryRenderer">
      <SystemQueryRenderer<ArtworkRelatedArtistsQuery>
        lazyLoad
        environment={relayEnvironment}
        variables={{ slug }}
        placeholder={PLACEHOLDER}
        query={graphql`
          query ArtworkRelatedArtistsQuery($slug: String!) {
            artwork(id: $slug) {
              ...ArtworkRelatedArtists_artwork
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
          if (props.artwork) {
            return (
              <ArtworkRelatedArtistsPaginationContainer
                artwork={props.artwork}
              />
            )
          }
        }}
      />
    </Box>
  )
}
