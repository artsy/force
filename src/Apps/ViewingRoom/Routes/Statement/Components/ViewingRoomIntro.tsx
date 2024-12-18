import type * as React from "react"
import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import type { ViewingRoomIntro_viewingRoom$data } from "__generated__/ViewingRoomIntro_viewingRoom.graphql"

interface ViewingRoomIntroProps {
  viewingRoom: ViewingRoomIntro_viewingRoom$data
}

const ViewingRoomIntro: React.FC<
  React.PropsWithChildren<ViewingRoomIntroProps>
> = ({ viewingRoom: { introStatement } }) => {
  if (!introStatement) {
    return null
  }

  return <Text variant="md">{introStatement}</Text>
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
