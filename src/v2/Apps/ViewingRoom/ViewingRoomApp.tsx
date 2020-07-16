import React, { useContext, useEffect } from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { Box, Separator } from "@artsy/palette"
import { ViewingRoomHeaderFragmentContainer as ViewingRoomHeader } from "./Components/ViewingRoomHeader"
import { ViewingRoomContentNotAccessibleFragmentContainer as ViewingRoomContentNotAccessible } from "./Components/ViewingRoomContentNotAccessible"
import { ViewingRoomTabBar } from "./Components/ViewingRoomTabBar"
import { createFragmentContainer, graphql } from "react-relay"

import { ViewingRoomApp_viewingRoom } from "v2/__generated__/ViewingRoomApp_viewingRoom.graphql"
import { ViewingRoomMetaFragmentContainer as ViewingRoomMeta } from "./Components/ViewingRoomMeta"
import { Footer } from "v2/Components/Footer"
import { ErrorPage } from "v2/Components/ErrorPage"
import { openAuthModal } from "v2/Utils/openAuthModal"
import { SystemContext } from "v2/Artsy"
import { ModalType } from "v2/Components/Authentication/Types"
import { ContextModule, Intent } from "@artsy/cohesion"

interface ViewingRoomAppProps {
  children: React.ReactNode
  viewingRoom: ViewingRoomApp_viewingRoom
}

const ViewingRoomApp: React.FC<ViewingRoomAppProps> = ({
  children,
  viewingRoom,
}) => {
  const { mediator, user } = useContext(SystemContext)
  useEffect(() => {
    if (user && user.id) return
    // openAuthModal will fire off "open:auth" event before ModalContainer
    // is mounted, use setTimeout to fire after next tick
    const timeoutID = setTimeout(() => {
      openAuthModal(mediator, {
        mode: ModalType.signup,
        redirectTo: window.location.href,
        contextModule: ContextModule.viewingRoom,
        intent: Intent.viewViewingRoom,
      })
    }, 0)

    return () => clearTimeout(timeoutID)
  }, [user, mediator])

  if (!viewingRoom) {
    return <ErrorPage code={404} />
  }

  const getView = () => {
    if (viewingRoom.status === "live") {
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

      <AppContainer maxWidth="100%">
        <ViewingRoomHeader viewingRoom={viewingRoom} />
        {user && getView()}
        <Box mx={2}>
          <Separator mt={6} mb={3} />
          <Footer />
        </Box>
      </AppContainer>
    </>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(ViewingRoomApp, {
  viewingRoom: graphql`
    fragment ViewingRoomApp_viewingRoom on ViewingRoom {
      ...ViewingRoomMeta_viewingRoom
      ...ViewingRoomHeader_viewingRoom
      ...ViewingRoomContentNotAccessible_viewingRoom
      status
    }
  `,
})
