import { Text } from "@artsy/palette"
import type { ViewingRoomPullQuote_viewingRoom$data } from "__generated__/ViewingRoomPullQuote_viewingRoom.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ViewingRoomPullQuoteProps {
  viewingRoom: ViewingRoomPullQuote_viewingRoom$data
}

const ViewingRoomPullQuote: React.FC<
  React.PropsWithChildren<ViewingRoomPullQuoteProps>
> = ({ viewingRoom: { pullQuote } }) => {
  if (!pullQuote) {
    return null
  }

  return (
    <Text variant="bq" style={{ whiteSpace: "pre-line" }}>
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
