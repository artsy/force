import React from "react"
import { Box, Button, Flex, Sans } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"

import { ViewingRoomClosed_viewingRoom } from "v2/__generated__/ViewingRoomClosed_viewingRoom.graphql"

interface ViewingRoomClosedProps {
  viewingRoom: ViewingRoomClosed_viewingRoom
}

const ViewingRoomClosed: React.FC<ViewingRoomClosedProps> = props => {
  const {
    viewingRoom: {
      partner: { href },
    },
  } = props

  const handleViewGalleryClick = () => {
    window.location.assign(href)
  }

  return (
    <Box>
      <Flex flexDirection="column" alignItems="center">
        <Sans size="4" mt={3} mb={1} textAlign="center" maxWidth="470px">
          This viewing room is now closed. We invite you to view this gallery's
          current works.
        </Sans>
        {href && (
          <Box>
            <Button variant="secondaryGray" onClick={handleViewGalleryClick}>
              View Gallery
            </Button>
          </Box>
        )}
      </Flex>
    </Box>
  )
}

export const ViewingRoomClosedFragmentContainer = createFragmentContainer(
  ViewingRoomClosed,
  {
    viewingRoom: graphql`
      fragment ViewingRoomClosed_viewingRoom on ViewingRoom {
        partner {
          href
        }
      }
    `,
  }
)
