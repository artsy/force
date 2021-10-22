import { useState } from "react";
import * as React from "react";
import { Box, Button, GridColumns, Column } from "@artsy/palette"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { PastAuctions_viewer } from "v2/__generated__/PastAuctions_viewer.graphql"
import { AuctionArtworksRailFragmentContainer } from "../Components/AuctionArtworksRail"
import { extractNodes } from "v2/Utils/extractNodes"
import { AuctionsZeroState } from "../Components/AuctionsZeroState"

export interface PastAuctionsProps {
  viewer: PastAuctions_viewer
  relay: RelayPaginationProp
}

const PastAuctions: React.FC<PastAuctionsProps> = ({ viewer, relay }) => {
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
    return <AuctionsZeroState>No past auctions.</AuctionsZeroState>
  }

  return (
    <>
      {nodes.map((node, index) => {
        return (
          <Box my={6} key={index}>
            <AuctionArtworksRailFragmentContainer sale={node} tabType="past" />
          </Box>
        )
      })}

      <GridColumns my={6}>
        <Column span={12} mx="auto">
          <Button
            width="100%"
            variant="secondaryGray"
            onClick={handleClick}
            loading={isLoading}
            disabled={!relay.hasMore()}
          >
            Show more
          </Button>
        </Column>
      </GridColumns>
    </>
  )
}

export const PastAuctionsPaginationContainer = createPaginationContainer(
  PastAuctions,
  {
    viewer: graphql`
      fragment PastAuctions_viewer on Viewer
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String" }
        ) {
        salesConnection(
          first: $first
          after: $after
          live: false
          sort: TIMELY_AT_NAME_DESC
          auctionState: CLOSED
        ) @connection(key: "PastAuctions_salesConnection") {
          totalCount
          edges {
            node {
              slug
              name
              href
              endAt
              ...AuctionArtworksRail_sale
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
      query PastAuctionsQuery($first: Int!, $after: String) {
        viewer {
          ...PastAuctions_viewer @arguments(first: $first, after: $after)
        }
      }
    `,
  }
)
