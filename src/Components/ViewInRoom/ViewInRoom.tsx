import { ModalBase } from "@artsy/palette"
import * as React from "react"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { ViewInRoom_artwork$data } from "__generated__/ViewInRoom_artwork.graphql"
import { ViewInRoomArtworkFragmentContainer } from "./ViewInRoomArtwork"
import { ViewInRoomCloseButton } from "./ViewInRoomCloseButton"
import { ViewInRoomRoom } from "./ViewInRoomRoom"
import { ViewInRoomScale } from "./ViewInRoomScale"
import { ViewInRoomTransition } from "./ViewInRoomTransition"

interface ViewInRoomProps {
  artwork: ViewInRoom_artwork$data
  onClose(): void
}

const ViewInRoom: React.FC<ViewInRoomProps> = ({ artwork, onClose }) => {
  return (
    <ModalBase position="relative" onClose={onClose}>
      <ViewInRoomTransition>
        {({ onMount }) => {
          return (
            <>
              <ViewInRoomRoom onMount={onMount}>
                <ViewInRoomArtworkFragmentContainer artwork={artwork} />

                <ViewInRoomScale />
              </ViewInRoomRoom>

              <ViewInRoomCloseButton
                position="absolute"
                top={0}
                right={0}
                p={2}
                onClick={onClose}
              />
            </>
          )
        }}
      </ViewInRoomTransition>
    </ModalBase>
  )
}

export const ViewInRoomFragmentContainer = createFragmentContainer(ViewInRoom, {
  artwork: graphql`
    fragment ViewInRoom_artwork on Artwork {
      ...ViewInRoomArtwork_artwork
    }
  `,
})

export const useViewInRoom = () => {
  const [isViewInRoomVisible, setIsViewInRoomVisible] = useState(false)

  const { trackEvent } = useTracking()

  const showViewInRoom = () => {
    setIsViewInRoomVisible(true)

    trackEvent({
      flow: DeprecatedAnalyticsSchema.Flow.ArtworkViewInRoom,
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
      context_module: DeprecatedAnalyticsSchema.ContextModule.ViewInRoom,
      type: DeprecatedAnalyticsSchema.Type.Button,
    })
  }

  const hideViewInRoom = () => {
    setIsViewInRoomVisible(false)
  }

  return {
    showViewInRoom,
    hideViewInRoom,
    isViewInRoomVisible,
  }
}
