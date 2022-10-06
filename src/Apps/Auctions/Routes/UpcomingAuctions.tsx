import { useState } from "react"
import * as React from "react"
import { Box, Button, GridColumns, Column } from "@artsy/palette"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { UpcomingAuctions_viewer$data } from "__generated__/UpcomingAuctions_viewer.graphql"
import { AuctionArtworksRailFragmentContainer } from "Apps/Auctions/Components/AuctionArtworksRail"
import { extractNodes } from "Utils/extractNodes"
import { AuctionsZeroState } from "Apps/Auctions/Components/AuctionsZeroState"

export interface UpcomingAuctionsProps {
  viewer: UpcomingAuctions_viewer$data
  relay: RelayPaginationProp
}

const UpcomingAuctions: React.FC<UpcomingAuctionsProps> = ({
  viewer,
  relay,
}) => {
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
    return <AuctionsZeroState>No upcoming auctions.</AuctionsZeroState>
  }

  return (
    <>
      {nodes.map((node, index) => {
        return (
          <Box my={6} key={index}>
            <AuctionArtworksRailFragmentContainer
              sale={node}
              tabType="upcoming"
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

export const UpcomingAuctionsPaginationContainer = createPaginationContainer(
  UpcomingAuctions,
  {
    viewer: graphql`
      fragment UpcomingAuctions_viewer on Viewer
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String" }
        ) {
        salesConnection(
          first: $first
          after: $after
          sort: START_AT_ASC
          auctionState: UPCOMING
        ) @connection(key: "UpcomingAuctions_salesConnection") {
          totalCount
          edges {
            node {
              slug
              name
              href
              status
              formattedStartDateTime
              eventStartAt
              isLiveOpen
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
      query UpcomingAuctionsQuery($first: Int!, $after: String) {
        viewer {
          ...UpcomingAuctions_viewer @arguments(first: $first, after: $after)
        }
      }
    `,
  }
)
