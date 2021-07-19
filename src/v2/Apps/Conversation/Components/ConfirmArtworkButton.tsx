import { Button } from "@artsy/palette"
import React, { useState } from "react"
import { createFragmentContainer, graphql, RelayProp } from "react-relay"
import createLogger from "v2/Utils/logger"
import { ConfirmArtworkButton_artwork } from "v2/__generated__/ConfirmArtworkButton_artwork.graphql"
import { MakeInquiryOffer } from "../Mutation/MakeInquiryOfferMutation"
import { useTracking } from "react-tracking"
import { tappedConfirmArtwork } from "@artsy/cohesion"

const logger = createLogger("Conversation/Components/ConfirmArtworkButton.tsx")

export interface ConfirmArtworkButtonProps {
  artwork: ConfirmArtworkButton_artwork
  relay: RelayProp
  editionSetID: string | null
  disabled?: boolean
  conversationID: string
}

export const ConfirmArtworkButton: React.FC<ConfirmArtworkButtonProps> = props => {
  const [
    isCommittingCreateOfferOrderMutation,
    setIsCommittingCreateOfferOrderMutation,
  ] = useState(false)

  const onMutationError = (error: Error) => {
    logger.error(error)
    // TODO: trigger error modal?
  }

  const tracking = useTracking()

  const handleCreateInquiryOfferOrder = () => {
    tracking.trackEvent(tappedConfirmArtwork())

    const { relay, artwork, editionSetID, conversationID } = props
    const { internalID } = artwork

    if (isCommittingCreateOfferOrderMutation) {
      return
    }
    setIsCommittingCreateOfferOrderMutation(true)
    if (relay && relay.environment) {
      return MakeInquiryOffer(
        relay.environment,
        conversationID,
        internalID,
        editionSetID,
        response => {
          setIsCommittingCreateOfferOrderMutation(false)
          const {
            createInquiryOfferOrder: { orderOrError },
          } = response
          if (orderOrError.__typename === "CommerceOrderWithMutationFailure") {
            onMutationError(orderOrError.error)
          } else if (
            orderOrError.__typename === "CommerceOrderWithMutationSuccess"
          ) {
            window.location.href = `/orders/${orderOrError.order.internalID}/offer`
          }
        },
        _error => {
          setIsCommittingCreateOfferOrderMutation(false)
          onMutationError(_error)
        }
      )
    }
  }

  return (
    <Button
      onClick={() => handleCreateInquiryOfferOrder()}
      loading={isCommittingCreateOfferOrderMutation}
      disabled={props.disabled}
      flexGrow={1}
    >
      Confirm
    </Button>
  )
}

export const ConfirmArtworkButtonFragmentContainer = createFragmentContainer(
  ConfirmArtworkButton,
  {
    artwork: graphql`
      fragment ConfirmArtworkButton_artwork on Artwork {
        internalID
      }
    `,
  }
)
