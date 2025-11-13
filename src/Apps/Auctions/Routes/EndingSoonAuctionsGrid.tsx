import ArtworkGrid from "Components/ArtworkGrid/ArtworkGrid"
import { extractNodes } from "Utils/extractNodes"
import { Box, Button, Text } from "@artsy/palette"
import type { EndingSoonAuctionsGrid_viewer$data } from "__generated__/EndingSoonAuctionsGrid_viewer.graphql"
import { type FC, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  type RelayPaginationProp,
} from "react-relay"

interface EndingSoonAuctionsGridProps {
  viewer: EndingSoonAuctionsGrid_viewer$data
  relay: RelayPaginationProp
}

export const EndingSoonAuctionsGrid: FC<
  React.PropsWithChildren<EndingSoonAuctionsGridProps>
> = ({ viewer, relay }) => {
  const [isLoading, setIsLoading] = useState(false)
  const nodes = extractNodes(viewer.saleArtworksConnection)

  if (!viewer.saleArtworksConnection || nodes.length === 0) {
    return (
      <Text variant="lg" mt={4} color="mono60">
        Nothing yet.
      </Text>
    )
  }

  const handleLoadMore = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setIsLoading(true)

    relay.loadMore(10, err => {
      setIsLoading(false)

      if (err) {
        console.error(err)
      }
    })
  }

  return (
    <>
      <ArtworkGrid
        artworks={viewer.saleArtworksConnection}
        onLoadMore={handleLoadMore}
        columnCount={[2, 3, 4]}
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

export const EndingSoonAuctionsGridPaginationContainer =
  createPaginationContainer(
    EndingSoonAuctionsGrid,
    {
      viewer: graphql`
        fragment EndingSoonAuctionsGrid_viewer on Viewer
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String" }
        ) {
          saleArtworksConnection(
            includeArtworksByFollowedArtists: true
            isAuction: true
            liveSale: true
            first: $first
            after: $after
          ) @connection(key: "EndingSoonAuctionsGrid_saleArtworksConnection") {
            pageInfo {
              hasNextPage
              endCursor
            }
            ...ArtworkGrid_artworks
            edges {
              node {
                id
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
          after: cursor,
        }
      },
      query: graphql`
        query EndingSoonAuctionsGridQuery($first: Int!, $after: String) {
          viewer {
            ...EndingSoonAuctionsGrid_viewer
              @arguments(first: $first, after: $after)
          }
        }
      `,
    }
  )
