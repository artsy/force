import { Column, GridColumns, Text } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ShowEvents_edges } from "v2/__generated__/ShowEvents_edges.graphql"
import { CellShowFragmentContainer } from "v2/Components/Cells/CellShow"

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
      <Text variant="lg-display" mb={6}>
        {eventTitle}
      </Text>

      <GridColumns mb={6} gridRowGap={[2, 4]}>
        {edges.map(({ node: show }) => {
          if (!show) return null

          return (
            <Column key={show.internalID} span={[6, 6, 3, 3]}>
              <CellShowFragmentContainer
                show={show}
                mode="GRID"
                displayKind
                displayPartner={false}
              />
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
        ...CellShow_show
        internalID
      }
    }
  `,
})
