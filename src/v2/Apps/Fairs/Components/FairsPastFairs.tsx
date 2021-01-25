import { Box, Button } from "@artsy/palette"
import React, { useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { FairsPastFairs_viewer } from "v2/__generated__/FairsPastFairs_viewer.graphql"
import { FairsFairRowFragmentContainer } from "./FairsFairRow"

interface FairsPastFairsProps {
  viewer: FairsPastFairs_viewer
  relay: RelayPaginationProp
}

export const FairsPastFairs: React.FC<FairsPastFairsProps> = ({
  viewer,
  relay,
}) => {
  const closedFairs = viewer.pastFairs?.edges

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
      <Box mb={3}>
        {closedFairs.map(({ node: fair }) => {
          if (!fair.isPublished && !fair.profile?.isPublished) return null

          return (
            <FairsFairRowFragmentContainer key={fair.internalID} fair={fair} />
          )
        })}
      </Box>

      <Button
        variant="secondaryOutline"
        width="100%"
        loading={isLoading}
        onClick={handleClick}
      >
        View more
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
