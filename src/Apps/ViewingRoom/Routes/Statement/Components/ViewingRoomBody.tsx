import * as React from "react"
import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomBody_viewingRoom$data } from "__generated__/ViewingRoomBody_viewingRoom.graphql"

interface ViewingRoomBodyProps {
  viewingRoom: ViewingRoomBody_viewingRoom$data
}

const ViewingRoomBody: React.FC<ViewingRoomBodyProps> = ({
  viewingRoom: { body },
}) => {
  if (!body) {
    return null
  }

  return (
    <Text variant="md" style={{ whiteSpace: "pre-line" }}>
      {body}
    </Text>
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
