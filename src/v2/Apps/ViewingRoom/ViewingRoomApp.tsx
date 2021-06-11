import React, { useContext } from "react"
import { Banner, Box, ClosedEyeIcon, Text } from "@artsy/palette"
import { ViewingRoomHeaderFragmentContainer as ViewingRoomHeader } from "./Components/ViewingRoomHeader"
import { ViewingRoomContentNotAccessibleFragmentContainer as ViewingRoomContentNotAccessible } from "./Components/ViewingRoomContentNotAccessible"
import { ViewingRoomTabBar } from "./Components/ViewingRoomTabBar"
import { createFragmentContainer, graphql } from "react-relay"

import { ViewingRoomApp_viewingRoom } from "v2/__generated__/ViewingRoomApp_viewingRoom.graphql"
import { ViewingRoomMetaFragmentContainer as ViewingRoomMeta } from "./Components/ViewingRoomMeta"
import { ErrorPage } from "v2/Components/ErrorPage"
import { SystemContext } from "v2/System"
import { userHasAccessToPartner } from "v2/Utils/user"

interface ViewingRoomAppProps {
  children: React.ReactNode
  viewingRoom: ViewingRoomApp_viewingRoom
}

const ViewingRoomApp: React.FC<ViewingRoomAppProps> = ({
  children,
  viewingRoom,
}) => {
  const { user } = useContext(SystemContext)

  if (!viewingRoom) {
    return <ErrorPage code={404} />
  }

  const showPreview =
    user &&
    // @ts-expect-error STRICT_NULL_CHECK
    userHasAccessToPartner(user, viewingRoom.partner.internalID) &&
    (viewingRoom.status === "draft" || viewingRoom.status === "scheduled")

  const getView = () => {
    if (viewingRoom.status === "live" || showPreview) {
      return (
        <>
          <ViewingRoomTabBar mb={[2, 3]} />
          {children}
        </>
      )
    }
    return <ViewingRoomContentNotAccessible viewingRoom={viewingRoom} />
  }

  return (
    <>
      <ViewingRoomMeta viewingRoom={viewingRoom} />
      {showPreview && (
        <Box position="fixed" left={0} top={58} width="100%" zIndex={1}>
          <Banner variant="defaultLight">
            <ClosedEyeIcon />
            <Text
              display="inline"
              verticalAlign="top"
              px={0.5}
              lineHeight="18px"
            >
              This is a preview of your viewing room.
            </Text>
          </Banner>
        </Box>
      )}

      <>
        <ViewingRoomHeader viewingRoom={viewingRoom} />
        {getView()}
      </>
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export const ViewingRoomAppFragmentContainer = createFragmentContainer(
  ViewingRoomApp,
  {
    viewingRoom: graphql`
      fragment ViewingRoomApp_viewingRoom on ViewingRoom {
        ...ViewingRoomMeta_viewingRoom
        ...ViewingRoomHeader_viewingRoom
        ...ViewingRoomContentNotAccessible_viewingRoom
        partner {
          internalID
        }
        status
      }
    `,
  }
)
