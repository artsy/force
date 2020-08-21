import React from "react"
import { Sans } from "@artsy/palette/dist/elements/Typography"
import { Box } from "@artsy/palette/dist/elements/Box"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomPullQuote_viewingRoom } from "v2/__generated__/ViewingRoomPullQuote_viewingRoom.graphql"

interface ViewingRoomPullQuoteProps {
  viewingRoom: ViewingRoomPullQuote_viewingRoom
}

const ViewingRoomPullQuote: React.FC<ViewingRoomPullQuoteProps> = ({
  viewingRoom: { pullQuote },
}) => {
  if (!pullQuote) {
    return null
  }

  return (
    <Box>
      <Sans size="8" textAlign="center" style={{ whiteSpace: "pre-line" }}>
        {pullQuote}
      </Sans>
    </Box>
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
