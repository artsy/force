import { Button, Column, GridColumns, Text } from "@artsy/palette"
import React, { FC, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import ArtworkGrid from "Components/ArtworkGrid/ArtworkGrid"
import { EndingSoonAuctionsGrid_viewer$data } from "__generated__/EndingSoonAuctionsGrid_viewer.graphql"
import { extractNodes } from "Utils/extractNodes"

interface EndingSoonAuctionsGridProps {
  viewer: EndingSoonAuctionsGrid_viewer$data
  relay: RelayPaginationProp
}

export const EndingSoonAuctionsGrid: FC<EndingSoonAuctionsGridProps> = ({
  viewer,
  relay,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const nodes = extractNodes(viewer.saleArtworksConnection)

  if (!viewer.saleArtworksConnection || nodes.length === 0) {
    return (
      <Text variant="lg" mt={4} color="black60">
        Nothing yet.
      </Text>
    )
  }

  const handleClick = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setIsLoading(true)

    const previousScrollY = window.scrollY

    relay.loadMore(10, err => {
      setIsLoading(false)

      if (window.scrollY > previousScrollY) {
        window.scrollTo({
          behavior: "auto",
          top: previousScrollY,
        })
      }

      if (err) {
        console.error(err)
      }
    })
  }

  return (
    <>
      <ArtworkGrid artworks={viewer.saleArtworksConnection} />
      <GridColumns my={6}>
        <Column span={12} mx="auto">
          <Button
            width="100%"
            onClick={handleClick}
            loading={isLoading}
            disabled={!relay.hasMore()}
          >
            Show More
          </Button>
        </Column>
      </GridColumns>
    </>
  )
}

export const EndingSoonAuctionsGridPaginationContainer = createPaginationContainer(
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
    getVariables(props, { count, cursor }, fragmentVariables) {
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
