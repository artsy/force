import { Box, Button, EntityHeader, Spacer } from "@artsy/palette"
import ArtworkGrid from "Components/ArtworkGrid/ArtworkGrid"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { WorksForYouArtistFeed_viewer$data } from "__generated__/WorksForYouArtistFeed_viewer.graphql"
import { useState } from "react"
import {
  type RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"

interface WorksForYouArtistFeedProps {
  relay: RelayPaginationProp
  viewer: WorksForYouArtistFeed_viewer$data
}

const WorksForYouArtistFeed: React.FC<
  React.PropsWithChildren<WorksForYouArtistFeedProps>
> = ({ relay, viewer }) => {
  const { user } = useSystemContext()
  const [isLoading, setLoading] = useState(false)
  const { artist } = viewer

  if (!artist) {
    return null
  }

  const avatarImage = artist?.image?.resized
  const meta = artist?.counts?.forSaleArtworks?.toLocaleString()

  const handleLoadMore = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setLoading(true)

    relay.loadMore(25, err => {
      if (err) console.error(err)
      setLoading(false)
    })
  }

  return (
    <>
      <EntityHeader
        name={artist.name!}
        meta={meta}
        image={{
          ...avatarImage,
          lazyLoad: true,
        }}
        href={artist.href!}
      />

      <Spacer y={4} />

      <ArtworkGrid
        artworks={artist.artworksConnection!}
        columnCount={[2, 3]}
        itemMargin={40}
        onLoadMore={handleLoadMore}
        user={user}
      />

      {relay.hasMore() && (
        <Box textAlign="center" mt={4}>
          <Button onClick={handleLoadMore} loading={isLoading}>
            Show More
          </Button>
        </Box>
      )}
    </>
  )
}

export const WorksForYouArtistFeedPaginationContainer =
  createPaginationContainer(
    WorksForYouArtistFeed,
    {
      viewer: graphql`
        fragment WorksForYouArtistFeed_viewer on Viewer
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 25 }
          cursor: { type: "String" }
          artistSlug: { type: "String!", defaultValue: "" }
          filter: {
            type: "[ArtistArtworksFilters]"
            defaultValue: [IS_FOR_SALE]
          }
        ) {
          artist(id: $artistSlug) {
            internalID
            name
            href
            counts {
              artworks
              forSaleArtworks
            }
            image {
              resized(height: 80, width: 80) {
                src
                srcSet
              }
            }
            artworksConnection(
              sort: PUBLISHED_AT_DESC
              first: $count
              after: $cursor
              filter: $filter
            ) @connection(key: "WorksForYouArtistFeed_artworksConnection") {
              ...ArtworkGrid_artworks
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      `,
    },
    {
      direction: "forward",
      getFragmentVariables(prevVars, totalCount) {
        return {
          ...prevVars,
          count: totalCount,
        }
      },
      getVariables(_props, { count, cursor }, fragmentVariables) {
        return {
          ...fragmentVariables,
          count,
          cursor,
        }
      },
      query: graphql`
        query WorksForYouArtistFeedPaginationQuery(
          $artistSlug: String!
          $count: Int!
          $cursor: String
          $filter: [ArtistArtworksFilters]
        ) {
          viewer {
            ...WorksForYouArtistFeed_viewer
              @arguments(
                artistSlug: $artistSlug
                count: $count
                cursor: $cursor
                filter: $filter
              )
          }
        }
      `,
    },
  )
