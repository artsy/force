import { Column, GridColumns, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowCardFragmentContainer } from "./ShowCard"
import { ShowEvents_edges } from "v2/__generated__/ShowEvents_edges.graphql"

interface ShowEventsProps {
  edges: ShowEvents_edges
  eventTitle: string
}

const ShowEvents: React.FC<ShowEventsProps> = ({
  edges,
  eventTitle,
}): JSX.Element => {
  return (
    <>
      <Text color="black" variant="lg" mb={6}>
        {eventTitle}
      </Text>

      <GridColumns mb={6} gridRowGap={[2, 4]}>
        {edges.map(({ node: show }) => {
          return (
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            <Column key={show.internalID} span={[6, 6, 3, 3]}>
              {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
              <ShowCardFragmentContainer isResponsive show={show} />
            </Column>
          )
        })}
      </GridColumns>
    </>
  )
}

export const ShowEventsFragmentContainer = createFragmentContainer(ShowEvents, {
  edges: graphql`
    fragment ShowEvents_edges on ShowEdge @relay(plural: true) {
      node {
        internalID
        ...ShowCard_show
      }
    }
  `,
})
