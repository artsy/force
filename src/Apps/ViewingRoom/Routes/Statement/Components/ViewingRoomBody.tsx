import { Text } from "@artsy/palette"
import type { ViewingRoomBody_viewingRoom$data } from "__generated__/ViewingRoomBody_viewingRoom.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ViewingRoomBodyProps {
  viewingRoom: ViewingRoomBody_viewingRoom$data
}

const ViewingRoomBody: React.FC<
  React.PropsWithChildren<ViewingRoomBodyProps>
> = ({ viewingRoom: { body } }) => {
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
  },
)
