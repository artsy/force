import React from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomMeta_viewingRoom } from "v2/__generated__/ViewingRoomMeta_viewingRoom.graphql"

interface ViewingRoomMetaProps {
  viewingRoom: ViewingRoomMeta_viewingRoom
}

const ViewingRoomMeta: React.FC<ViewingRoomMetaProps> = ({
  viewingRoom: { title },
}) => {
  return (
    <>
      <Title>{title}</Title>
      <Meta name="robots" content="noindex, nofollow" />
    </>
  )
}

export const ViewingRoomMetaFragmentContainer = createFragmentContainer(
  ViewingRoomMeta,
  {
    viewingRoom: graphql`
      fragment ViewingRoomMeta_viewingRoom on ViewingRoom {
        title
      }
    `,
  }
)
