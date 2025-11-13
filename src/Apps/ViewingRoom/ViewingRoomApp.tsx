import { ViewingRoomStructuredData } from "Apps/ViewingRoom/Components/ViewingRoomStructuredData"
import { FullBleedBanner } from "Components/FullBleedBanner"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { SystemContext } from "System/Contexts/SystemContext"
import HideIcon from "@artsy/icons/HideIcon"
import { Join, Spacer } from "@artsy/palette"
import type { ViewingRoomApp_viewingRoom$data } from "__generated__/ViewingRoomApp_viewingRoom.graphql"
import type * as React from "react"
import { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomContentNotAccessibleFragmentContainer as ViewingRoomContentNotAccessible } from "./Components/ViewingRoomContentNotAccessible"
import { ViewingRoomHeaderFragmentContainer as ViewingRoomHeader } from "./Components/ViewingRoomHeader"
import { ViewingRoomMetaFragmentContainer as ViewingRoomMeta } from "./Components/ViewingRoomMeta"
import { ViewingRoomTabBar } from "./Components/ViewingRoomTabBar"

interface ViewingRoomAppProps {
  children: React.ReactNode
  viewingRoom: ViewingRoomApp_viewingRoom$data
}

const ViewingRoomApp: React.FC<
  React.PropsWithChildren<ViewingRoomAppProps>
> = ({ children, viewingRoom }) => {
  const { user } = useContext(SystemContext)

  const isPreviewable =
    user &&
    (viewingRoom.status === "draft" || viewingRoom.status === "scheduled")

  return (
    <>
      <Analytics contextPageOwnerId={viewingRoom.internalID}>
        <ViewingRoomMeta viewingRoom={viewingRoom} />

        {isPreviewable && (
          <FullBleedBanner variant="defaultLight">
            <HideIcon mr={1} />
            This is a preview of your viewing room.
          </FullBleedBanner>
        )}

        <Join separator={<Spacer y={4} />}>
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
      </Analytics>

      <ViewingRoomStructuredData viewingRoom={viewingRoom} />
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
        ...ViewingRoomStructuredData_viewingRoom
        internalID
        status
        partner {
          internalID
        }
      }
    `,
  }
)
