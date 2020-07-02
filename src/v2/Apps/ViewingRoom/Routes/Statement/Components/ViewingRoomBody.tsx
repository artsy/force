import React from "react"
import { Box, Serif } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomBody_viewingRoom } from "v2/__generated__/ViewingRoomBody_viewingRoom.graphql"

interface ViewingRoomBodyProps {
  viewingRoom: ViewingRoomBody_viewingRoom
}

const ViewingRoomBody: React.FC<ViewingRoomBodyProps> = ({
  viewingRoom: { body },
}) => {
  if (!body) {
    return null
  }

  return (
    <Box>
      <Serif size={["4", "5"]} style={{ whiteSpace: "pre-line" }}>
        {body}
      </Serif>
    </Box>
  )
}

export const ViewingRoomBodyFragmentContainer = createFragmentContainer(
  ViewingRoomBody,
  {
    viewingRoom: graphql`
      fragment ViewingRoomBody_viewingRoom on ViewingRoom {
        body
      }
    `,
  }
)
