import React, { useContext, useEffect } from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { Banner, Box, ClosedEyeIcon, Separator, Text } from "@artsy/palette"
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
import { useRouter } from "v2/Artsy/Router/useRouter"
import { userHasAccessToPartner } from "v2/Utils/user"

interface ViewingRoomAppProps {
  children: React.ReactNode
  viewingRoom: ViewingRoomApp_viewingRoom
}

const ViewingRoomApp: React.FC<ViewingRoomAppProps> = ({
  children,
  viewingRoom,
}) => {
  const { mediator, user } = useContext(SystemContext)
  const { router } = useRouter()
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
        copy: "Sign up to enter viewing rooms",
        disableCloseOnBackgroundClick: true,
        afterClose: () => {
          router.push("/viewing-rooms")
        },
      })
    }, 0)

    return () => clearTimeout(timeoutID)
  }, [user, router, mediator])

  if (!viewingRoom) {
    return <ErrorPage code={404} />
  }

  const showPreview =
    user &&
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
          <Banner backgroundColor="black10" textColor="black100">
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
      partner {
        internalID
      }
      status
    }
  `,
})
