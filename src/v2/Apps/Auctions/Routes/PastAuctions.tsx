import React, { useState } from "react"
import { Box, Grid, Row, Col, Button } from "@artsy/palette"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"

import { PastAuctions_viewer } from "v2/__generated__/PastAuctions_viewer.graphql"
import { AuctionArtworksRailFragmentContainer } from "../Components/AuctionArtworksRail/AuctionArtworksRail"

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

    relay.loadMore(15, err => {
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
              <AuctionArtworksRailFragmentContainer sale={node} />
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

export const PastAuctionsPaginationContainer = createPaginationContainer(
  PastAuctions,
  {
    viewer: graphql`
      fragment PastAuctions_viewer on Viewer
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 15 }
          after: { type: "String" }
        ) {
        salesConnection(
          first: $first
          after: $after
          published: false
          live: false
          sort: START_AT_DESC
          auctionStatus: CLOSED
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
