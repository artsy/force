import React from "react"
import { Box, Sans } from "@artsy/palette"
import { ViewingRoomsFeaturedRail_featuredViewingRooms } from "v2/__generated__/ViewingRoomsFeaturedRail_featuredViewingRooms.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface ViewingRoomsFeaturedRailProps {
  featuredViewingRooms: ViewingRoomsFeaturedRail_featuredViewingRooms
}

export const ViewingRoomsFeaturedRail: React.FC<ViewingRoomsFeaturedRailProps> = props => {
  const featuredViewingRooms = props.featuredViewingRooms

  const featuredViewingRoomsForRail = featuredViewingRooms.edges
    .map(vr => {
      return vr.node ? vr.node : null
    })
    .filter(Boolean)

  return featuredViewingRoomsForRail.length > 0 && (
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
export const ViewingRoomsFeaturedRailFragmentContainer = createFragmentContainer(
  ViewingRoomsFeaturedRail,
  {
    featuredViewingRooms: graphql`
      fragment ViewingRoomsFeaturedRail_featuredViewingRooms on ViewingRoomConnection {
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

export default ViewingRoomsFeaturedRailFragmentContainer
