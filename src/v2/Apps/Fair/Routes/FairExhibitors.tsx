import { Button, Col, Grid, Row } from "@artsy/palette"
import React, { useState } from "react"
import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import { FairExhibitors_fair } from "v2/__generated__/FairExhibitors_fair.graphql"
import { FairExhibitorRailFragmentContainer as FairExhibitorRail } from "../Components/FairExhibitorRail"

interface FairExhibitorsProps {
  fair: FairExhibitors_fair
  relay: RelayPaginationProp
}

const FairExhibitors: React.FC<FairExhibitorsProps> = ({ fair, relay }) => {
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
      {fair.exhibitors.edges.map(({ node: show }) => {
        if (show.counts.artworks === 0 || !show.partner) {
          // Skip rendering of booths without artworks
          return null
        }

        return <FairExhibitorRail key={show.id} show={show} my={3} />
      })}

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

export const FairExhibitorsFragmentContainer = createPaginationContainer(
  FairExhibitors,
  {
    fair: graphql`
      fragment FairExhibitors_fair on Fair
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 15 }
          after: { type: "String" }
        ) {
        slug
        exhibitors: showsConnection(
          first: $first
          after: $after
          sort: FEATURED_ASC
        ) @connection(key: "FairExhibitorsQuery_exhibitors") {
          edges {
            node {
              id
              counts {
                artworks
              }
              partner {
                ... on Partner {
                  id
                }
                ... on ExternalPartner {
                  id
                }
              }
              ...FairExhibitorRail_show
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getVariables({ fair: { slug: id } }, { cursor: after }, { first }) {
      return { first, after, id }
    },
    query: graphql`
      query FairExhibitorsQuery($id: String!, $first: Int!, $after: String) {
        fair(id: $id) {
          ...FairExhibitors_fair @arguments(first: $first, after: $after)
        }
      }
    `,
  }
)

// Top-level route needs to be exported for bundle splitting in the router
export default FairExhibitorsFragmentContainer
