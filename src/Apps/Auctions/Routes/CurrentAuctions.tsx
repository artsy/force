import { Box, Button, Column, GridColumns } from "@artsy/palette"
import { AuctionArtworkRailQueryRenderer } from "Apps/Auctions/Components/AuctionArtworksRail"
import { AuctionsZeroState } from "Apps/Auctions/Components/AuctionsZeroState"
import { extractNodes } from "Utils/extractNodes"
import type { CurrentAuctions_viewer$data } from "__generated__/CurrentAuctions_viewer.graphql"
import { useState } from "react"
import type * as React from "react"
import {
  type RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"

export interface CurrentAuctionsProps {
  viewer: CurrentAuctions_viewer$data
  relay: RelayPaginationProp
}

const CurrentAuctions: React.FC<
  React.PropsWithChildren<CurrentAuctionsProps>
> = ({ viewer, relay }) => {
  const [isLoading, setIsLoading] = useState(false)

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

  const nodes = extractNodes(viewer.salesConnection)

  if (nodes.length === 0) {
    return <AuctionsZeroState>No current auctions.</AuctionsZeroState>
  }

  return (
    <>
      {nodes.map((node, index) => {
        return (
          <Box my={6} key={index}>
            <AuctionArtworkRailQueryRenderer
              slug={node.slug}
              tabType="current"
            />
          </Box>
        )
      })}

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

export const CurrentAuctionsPaginationContainer = createPaginationContainer(
  CurrentAuctions,
  {
    viewer: graphql`
      fragment CurrentAuctions_viewer on Viewer
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 10 }
        after: { type: "String" }
      ) {
        salesConnection(
          first: $first
          after: $after
          live: true
          published: true
          sort: LICENSED_TIMELY_AT_NAME_DESC
          auctionState: OPEN
        ) @connection(key: "CurrentAuctions_salesConnection") {
          totalCount
          edges {
            node {
              slug
              name
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
      query CurrentAuctionsQuery($first: Int!, $after: String) {
        viewer {
          ...CurrentAuctions_viewer @arguments(first: $first, after: $after)
        }
      }
    `,
  },
)
