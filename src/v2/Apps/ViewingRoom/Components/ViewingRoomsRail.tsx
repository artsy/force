import React from "react"
import { Box, Sans } from "@artsy/palette"
import { ViewingRoomsRail_featuredViewingRooms } from "v2/__generated__/ViewingRoomsRail_featuredViewingRooms.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface ViewingRoomsRailProps {
  featuredViewingRooms: ViewingRoomsRail_featuredViewingRooms
}

export const ViewingRoomsRail: React.FC<ViewingRoomsRailProps> = props => {
  const featuredViewingRooms = props.featuredViewingRooms

  const featuredViewingRoomsForRail = featuredViewingRooms.edges
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

  return (
    <Box>
      <Sans size="5">Featured</Sans>
      <Box>
        {featuredViewingRoomsForRail.map(vr => {
          return (
            <Sans size="3t" key={vr.slug}>
              {vr.title}
            </Sans>
          )
        })}
      </Box>
    </Box>
  )
}
export const ViewingRoomsRailFragmentContainer = createFragmentContainer(
  ViewingRoomsRail,
  {
    featuredViewingRooms: graphql`
      fragment ViewingRoomsRail_featuredViewingRooms on ViewingRoomConnection {
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

export default ViewingRoomsRailFragmentContainer
