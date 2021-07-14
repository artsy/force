import React, { useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"

import { Box, Button, Col, Grid, Row, Text } from "@artsy/palette"

import { extractNodes } from "v2/Utils/extractNodes"
import { TrendingLots_viewer } from "v2/__generated__/TrendingLots_viewer.graphql"

export interface TrendingLotsProps {
  viewer: TrendingLots_viewer
  relay: RelayPaginationProp
}

const TrendingLots: React.FC<TrendingLotsProps> = ({ viewer, relay }) => {
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

  const nodes = extractNodes(viewer.saleArtworksConnection)

  if (nodes.length === 0) {
    return (
      <Box>
        <Text>No current lots.</Text>
      </Box>
    )
  }

  return (
    <>
      <Box>HOLDING</Box>

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

export const TrendingLotsPaginationContainer = createPaginationContainer(
  TrendingLots,
  {
    viewer: graphql`
      fragment TrendingLots_viewer on Viewer
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String" }
        ) {
        saleArtworksConnection(first: $first, after: $after)
          @connection(key: "TrendingLots_saleArtworksConnection") {
          edges {
            counts {
              bidderPositions
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
      query TrendingLotsQuery($first: Int!, $after: String) {
        viewer {
          ...TrendingLots_viewer @arguments(first: $first, after: $after)
        }
      }
    `,
  }
)
