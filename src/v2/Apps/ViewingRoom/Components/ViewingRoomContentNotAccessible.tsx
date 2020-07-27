import React from "react"
import { Box, Button, Flex, Sans } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

import { ViewingRoomContentNotAccessible_viewingRoom } from "v2/__generated__/ViewingRoomContentNotAccessible_viewingRoom.graphql"

interface ViewingRoomContentNotAccessibleProps {
  viewingRoom: ViewingRoomContentNotAccessible_viewingRoom
}

const ViewingRoomContentNotAccessible: React.FC<ViewingRoomContentNotAccessibleProps> = props => {
  const {
    viewingRoom: {
      status,
      partner: { href },
    },
  } = props

  const infoText =
    status === "scheduled"
      ? "This viewing room is not yet open."
      : "This viewing room is now closed."

  return (
    <Box>
      <Flex flexDirection="column" alignItems="center">
        <Sans size="4" mt={50} mb={1} textAlign="center" maxWidth="470px">
          {infoText} We invite you to view this gallery's current works.
        </Sans>
        {href && (
          <RouterLink to={href}>
            <Button variant="secondaryGray">Visit Gallery</Button>
          </RouterLink>
        )}
      </Flex>
    </Box>
  )
}

export const ViewingRoomContentNotAccessibleFragmentContainer = createFragmentContainer(
  ViewingRoomContentNotAccessible,
  {
    viewingRoom: graphql`
      fragment ViewingRoomContentNotAccessible_viewingRoom on ViewingRoom {
        status
        partner {
          href
        }
      }
    `,
  }
)
