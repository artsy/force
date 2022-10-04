import { Box, Button } from "@artsy/palette"
import { useState } from "react"
import * as React from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { FairsPastFairs_viewer$data } from "__generated__/FairsPastFairs_viewer.graphql"
import { FairsFairRowFragmentContainer } from "./FairsFairRow"

interface FairsPastFairsProps {
  viewer: FairsPastFairs_viewer$data
  relay: RelayPaginationProp
}

export const FairsPastFairs: React.FC<FairsPastFairsProps> = ({
  viewer,
  relay,
}) => {
  const closedFairs = extractNodes(viewer.pastFairs)

  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setIsLoading(true)

    relay.loadMore(15, err => {
      setIsLoading(false)

      if (err) {
        console.error(err)
      }
    })
  }

  return (
    <>
      <Box mb={4} data-test="pastFairs">
        {closedFairs.map(fair => {
          if (!fair.isPublished && !fair.profile?.isPublished) return null

          return (
            <FairsFairRowFragmentContainer key={fair.internalID} fair={fair} />
          )
        })}
      </Box>

      <Button
        display="block"
        mx="auto"
        loading={isLoading}
        onClick={handleClick}
      >
        Show More
      </Button>
    </>
  )
}

export const FAIRS_PAST_FAIRS_QUERY = graphql`
  query FairsPastFairsQuery($first: Int!, $after: String) {
    viewer {
      ...FairsPastFairs_viewer @arguments(first: $first, after: $after)
    }
  }
`

export const FairsPastFairsPaginationContainer = createPaginationContainer(
  FairsPastFairs,
  {
    viewer: graphql`
      fragment FairsPastFairs_viewer on Viewer
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 15 }
          after: { type: "String" }
        ) {
        pastFairs: fairsConnection(
          hasListing: true
          hasFullFeature: true
          sort: START_AT_DESC
          status: CLOSED
          first: $first
          after: $after
        ) @connection(key: "FairsPastFairsQuery_pastFairs") {
          edges {
            node {
              internalID
              isPublished
              profile {
                isPublished
              }
              ...FairsFairRow_fair
            }
          }
        }
      }
    `,
  },
  {
    query: FAIRS_PAST_FAIRS_QUERY,
    direction: "forward",
    getVariables(_, { cursor: after }, { first }) {
      return { after, first }
    },
  }
)
