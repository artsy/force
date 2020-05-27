import React from "react"
import { Box, Button, Flex, Sans } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

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

  return (
    <Box>
      <Flex flexDirection="column" alignItems="center">
        <Sans size="4" mt={50} mb={1} textAlign="center" maxWidth="470px">
          This viewing room is now closed. We invite you to view this gallery's
          current works.
        </Sans>
        {href && (
          <RouterLink to={href}>
            <Button variant="secondaryGray">View Gallery</Button>
          </RouterLink>
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
