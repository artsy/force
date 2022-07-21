import { ModalBase } from "@artsy/palette"
import * as React from "react"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AnalyticsSchema, useTracking } from "System"
import { ViewInRoom_artwork } from "__generated__/ViewInRoom_artwork.graphql"
import { ViewInRoomArtworkFragmentContainer } from "./ViewInRoomArtwork"
import { ViewInRoomCloseButton } from "./ViewInRoomCloseButton"
import { ViewInRoomRoom } from "./ViewInRoomRoom"
import { ViewInRoomScale } from "./ViewInRoomScale"
import { ViewInRoomTransition } from "./ViewInRoomTransition"

interface ViewInRoomProps {
  artwork: ViewInRoom_artwork
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
      flow: AnalyticsSchema.Flow.ArtworkViewInRoom,
      action_type: AnalyticsSchema.ActionType.Click,
      context_module: AnalyticsSchema.ContextModule.ViewInRoom,
      type: AnalyticsSchema.Type.Button,
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
