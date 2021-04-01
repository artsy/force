import React, { useState } from "react"
import { Box, Grid, Row, Col, Button } from "@artsy/palette"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"

import { UpcomingAuctions_viewer } from "v2/__generated__/UpcomingAuctions_viewer.graphql"
import { AuctionArtworksRailFragmentContainer } from "../Components/AuctionArtworksRail/AuctionArtworksRail"

export interface UpcomingAuctionsProps {
  viewer: UpcomingAuctions_viewer
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

    relay.loadMore(5, err => {
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
      <Box>
        {viewer.salesConnection.edges.map(({ node }, index) => {
          return (
            <Box my={4} key={index}>
              <AuctionArtworksRailFragmentContainer
                sale={node}
                tabType="upcoming"
              />
            </Box>
          )
        })}
      </Box>

      <Grid my={6}>
        <Row>
          <Col sm={6} mx="auto">
            <Button
              width="100%"
              variant="secondaryGray"
              onClick={handleClick}
              loading={isLoading}
              disabled={!relay.hasMore()}
            >
              Show more
            </Button>
          </Col>
        </Row>
      </Grid>
    </>
  )
}

export const UpcomingAuctionsPaginationContainer = createPaginationContainer(
  UpcomingAuctions,
  {
    viewer: graphql`
      fragment UpcomingAuctions_viewer on Viewer
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 30 }
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
