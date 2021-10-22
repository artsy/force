import * as React from "react";
import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomIntro_viewingRoom } from "v2/__generated__/ViewingRoomIntro_viewingRoom.graphql"

interface ViewingRoomIntroProps {
  viewingRoom: ViewingRoomIntro_viewingRoom
}

const ViewingRoomIntro: React.FC<ViewingRoomIntroProps> = ({
  viewingRoom: { introStatement },
}) => {
  if (!introStatement) {
    return null
  }

  return <Text variant="sm">{introStatement}</Text>
}

export const ViewingRoomIntroFragmentContainer = createFragmentContainer(
  ViewingRoomIntro,
  {
    viewingRoom: graphql`
      fragment ViewingRoomIntro_viewingRoom on ViewingRoom {
        introStatement
      }
    `,
  }
)
