import { useContext } from "react"
import * as React from "react"
import {
  Banner,
  ClosedEyeIcon,
  Flex,
  FullBleed,
  Join,
  Spacer,
} from "@artsy/palette"
import { ViewingRoomHeaderFragmentContainer as ViewingRoomHeader } from "./Components/ViewingRoomHeader"
import { ViewingRoomContentNotAccessibleFragmentContainer as ViewingRoomContentNotAccessible } from "./Components/ViewingRoomContentNotAccessible"
import { ViewingRoomTabBar } from "./Components/ViewingRoomTabBar"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomApp_viewingRoom$data } from "v2/__generated__/ViewingRoomApp_viewingRoom.graphql"
import { ViewingRoomMetaFragmentContainer as ViewingRoomMeta } from "./Components/ViewingRoomMeta"
import { SystemContext } from "v2/System"
import { userHasAccessToPartner } from "v2/Utils/user"

interface ViewingRoomAppProps {
  children: React.ReactNode
  viewingRoom: ViewingRoomApp_viewingRoom$data
}

const ViewingRoomApp: React.FC<ViewingRoomAppProps> = ({
  children,
  viewingRoom,
}) => {
  const { user } = useContext(SystemContext)

  const isPreviewable =
    user &&
    userHasAccessToPartner(user, viewingRoom.partner?.internalID!) &&
    (viewingRoom.status === "draft" || viewingRoom.status === "scheduled")

  return (
    <>
      <ViewingRoomMeta viewingRoom={viewingRoom} />

      {isPreviewable && (
        <FullBleed>
          <Banner variant="defaultLight">
            <Flex
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              <ClosedEyeIcon mr={1} />
              This is a preview of your viewing room.
            </Flex>
          </Banner>
        </FullBleed>
      )}

      <Join separator={<Spacer mt={4} />}>
        <ViewingRoomHeader viewingRoom={viewingRoom} />

        {viewingRoom.status === "live" || isPreviewable ? (
          <>
            <ViewingRoomTabBar />

            <div>{children}</div>
          </>
        ) : (
          <ViewingRoomContentNotAccessible viewingRoom={viewingRoom} />
        )}
      </Join>
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
