import { Box, Button, EntityHeader, Spacer } from "@artsy/palette"
import React, { useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import ArtworkGrid from "Components/ArtworkGrid/ArtworkGrid"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { extractNodes } from "Utils/extractNodes"
import { WorksForYouFeed_viewer$data } from "__generated__/WorksForYouFeed_viewer.graphql"

interface WorksForYouFeedProps {
  viewer: WorksForYouFeed_viewer$data
  relay: RelayPaginationProp
}

export const WorksForYouFeed: React.FC<WorksForYouFeedProps> = ({
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

        return (
          <Box mb={4} key={index}>
            <EntityHeader
              name={artwork.artists!}
              meta={meta}
              image={{
                ...avatarImage,
                lazyLoad: true,
              }}
              href={artwork.href!}
            />

            <Spacer y={4} />

            <ArtworkGrid
              artworks={artwork.artworksConnection!}
              columnCount={[2, 3]}
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

export const WorksForYouFeedPaginationContainer = createPaginationContainer(
  WorksForYouFeed,
  {
    viewer: graphql`
      fragment WorksForYouFeed_viewer on Viewer
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
                key: "WorksForYouFeed_bundledArtworksByArtistConnection"
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
      query WorksForYouFeedPaginationQuery($count: Int!, $cursor: String) {
        viewer {
          ...WorksForYouFeed_viewer @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
  }
)
