import { Box, Button, EntityHeader, Spacer } from "@artsy/palette"
import { useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import ArtworkGrid from "v2/Components/ArtworkGrid"
import { useSystemContext } from "v2/System"
import { WorksForYou2ArtistFeed_viewer } from "v2/__generated__/WorksForYou2ArtistFeed_viewer.graphql"

interface WorksForYou2ArtistFeedProps {
  relay: RelayPaginationProp
  viewer: WorksForYou2ArtistFeed_viewer
}

const WorksForYou2ArtistFeed: React.FC<WorksForYou2ArtistFeedProps> = ({
  relay,
  viewer,
}) => {
  const { user } = useSystemContext()
  const [isLoading, setLoading] = useState(false)
  const { artist } = viewer

  if (!artist) {
    return null
  }

  const avatarImage = artist?.image?.resized
  const meta = artist?.counts?.forSaleArtworks?.toLocaleString()
  const worksForSaleHref = artist.href + "/works-for-sale"

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
        href={worksForSaleHref}
      />

      <Spacer my={4} />

      <ArtworkGrid
        artworks={artist.artworksConnection!}
        columnCount={3}
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

export const WorksForYou2ArtistFeedPaginationContainer = createPaginationContainer(
  WorksForYou2ArtistFeed,
  {
    viewer: graphql`
      fragment WorksForYou2ArtistFeed_viewer on Viewer
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
          ) @connection(key: "WorksForYou2ArtistFeed_artworksConnection") {
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
      query WorksForYou2ArtistFeedPaginationQuery(
        $artistSlug: String!
        $count: Int!
        $cursor: String
        $filter: [ArtistArtworksFilters]
      ) {
        viewer {
          ...WorksForYou2ArtistFeed_viewer
            @arguments(
              artistSlug: $artistSlug
              count: $count
              cursor: $cursor
              filter: $filter
            )
        }
      }
    `,
  }
)
