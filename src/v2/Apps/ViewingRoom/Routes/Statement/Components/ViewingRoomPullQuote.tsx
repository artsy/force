import * as React from "react"
import { Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomPullQuote_viewingRoom$data } from "v2/__generated__/ViewingRoomPullQuote_viewingRoom.graphql"

interface ViewingRoomPullQuoteProps {
  viewingRoom: ViewingRoomPullQuote_viewingRoom$data
}

const ViewingRoomPullQuote: React.FC<ViewingRoomPullQuoteProps> = ({
  viewingRoom: { pullQuote },
}) => {
  if (!pullQuote) {
    return null
  }

  return (
    <Text variant="xxl" style={{ whiteSpace: "pre-line" }}>
      {pullQuote}
    </Text>
  )
}

export const ViewingRoomPullQuoteFragmentContainer = createFragmentContainer(
  ViewingRoomPullQuote,
  {
    viewingRoom: graphql`
      fragment ViewingRoomPullQuote_viewingRoom on ViewingRoom {
        pullQuote
      }
    `,
  }
)
