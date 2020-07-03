import React from "react"
import { Box, CSSGrid, Sans } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomsLatestGrid_viewingRooms } from "v2/__generated__/ViewingRoomsLatestGrid_viewingRooms.graphql"

export interface ViewingRoomsLatestGridProps {
  viewingRooms: ViewingRoomsLatestGrid_viewingRooms
}

export const ViewingRoomsLatestGrid: React.FC<ViewingRoomsLatestGridProps> = props => {
  const viewingRooms = props.viewingRooms

  if (!viewingRooms?.edges?.length) {
    return null
  }

  const viewingRoomsForLatestGrid = viewingRooms.edges
    .map(vr => {
      if (!vr.node) {
        return null
      }

      if (vr.node.status != "scheduled" && vr.node.status != "live") {
        return null
      }

      return {
        ...vr.node,
      }
    })
    .filter(Boolean)
  const count = viewingRoomsForLatestGrid.length

  return (
    <Box>
      <Sans size="5">Latest</Sans>
      <Box>
        <CSSGrid
          mt={2}
          mb={6}
          gridTemplateColumns={[
            "repeat(1fr)",
            `repeat(${Math.min(count, 2)}, 1fr)`,
            `repeat(${Math.min(count, 3)}, 1fr)`,
          ]}
          gridColumnGap={2}
          gridRowGap={6}
        >
          {viewingRoomsForLatestGrid.map(vr => {
            return (
              <Sans size="3t" key={vr.slug}>
                {vr.title}
              </Sans>
            )
          })}
        </CSSGrid>
      </Box>
    </Box>
  )
}

export const ViewingRoomsLatestGridFragmentContainer = createFragmentContainer(
  ViewingRoomsLatestGrid,
  {
    viewingRooms: graphql`
      fragment ViewingRoomsLatestGrid_viewingRooms on ViewingRoomConnection {
        edges {
          node {
            slug
            status
            title
          }
        }
      }
    `,
  }
)
