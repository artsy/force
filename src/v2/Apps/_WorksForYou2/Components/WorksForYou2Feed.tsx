import { Box, Button, EntityHeader, Spacer } from "@artsy/palette"
import React, { useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import ArtworkGrid from "v2/Components/ArtworkGrid"
import { useSystemContext } from "v2/System"
import { extractNodes } from "v2/Utils/extractNodes"
import { WorksForYou2Feed_viewer } from "v2/__generated__/WorksForYou2Feed_viewer.graphql"

interface WorksForYou2FeedProps {
  viewer: WorksForYou2Feed_viewer
  relay: RelayPaginationProp
}

export const WorksForYou2Feed: React.FC<WorksForYou2FeedProps> = ({
  viewer,
  relay,
}) => {
  const { user } = useSystemContext()
  const [loading, setLoading] = useState(false)

  const artworks = extractNodes(
    viewer.me?.followsAndSaves?.bundledArtworksByArtistConnection
  )

  const loadMore = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setLoading(true)

    relay.loadMore(25, err => {
      if (err) console.error(err)

      setTimeout(() => {
        setLoading(false)
      }, 2500)
    })
  }

  return (
    <>
      {artworks.map((artwork, index) => {
        const avatarImage = artwork.image?.resized
        const meta = `${artwork.summary}, ${artwork.publishedAt}`
        const worksForSaleHref = artwork.href + "/works-for-sale"

        return (
          <Box mb={4} key={index}>
            <EntityHeader
              name={artwork.artists!}
              meta={meta}
              image={{
                ...avatarImage,
                lazyLoad: true,
              }}
              href={worksForSaleHref}
            />

            <Spacer my={4} />

            <ArtworkGrid
              artworks={artwork.artworksConnection!}
              columnCount={3}
              itemMargin={40}
              user={user}
            />
          </Box>
        )
      })}

      {relay.hasMore() && (
        <Box textAlign="center" mt={4}>
          <Button onClick={loadMore} loading={loading}>
            Show More
          </Button>
        </Box>
      )}
    </>
  )
}

export const WorksForYou2FeedPaginationContainer = createPaginationContainer(
  WorksForYou2Feed,
  {
    viewer: graphql`
      fragment WorksForYou2Feed_viewer on Viewer
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 25 }
          cursor: { type: "String" }
        ) {
        me {
          followsAndSaves {
            bundledArtworksByArtistConnection(
              sort: PUBLISHED_AT_DESC
              first: $count
              after: $cursor
              forSale: true
            )
              @connection(
                key: "WorksForYou2Feed_bundledArtworksByArtistConnection"
              ) {
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  id
                  href
                  summary
                  artists
                  publishedAt(format: "MMM DD")
                  artworksConnection {
                    ...ArtworkGrid_artworks
                  }
                  image {
                    resized(height: 80, width: 80) {
                      src
                      srcSet
                    }
                  }
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
      query WorksForYou2FeedPaginationQuery($count: Int!, $cursor: String) {
        viewer {
          ...WorksForYou2Feed_viewer @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
)
