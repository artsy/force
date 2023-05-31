import { Box, Button, Spacer, Text } from "@artsy/palette"
import * as React from "react"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { RouterLink } from "System/Router/RouterLink"
import { SavedSearchCreateAlertButtonContainer } from "Components/SavedSearchAlert/Components/SavedSearchCreateAlertButtonContainer"
import {
  SavedSearchEntity,
  SearchCriteriaAttributes,
} from "Components/SavedSearchAlert/types"
import { ContextModule, Intent, OwnerType } from "@artsy/cohesion"
import { lotIsClosed } from "Apps/Artwork/Utils/lotIsClosed"
import { useTimer } from "Utils/Hooks/useTimer"
import { useState } from "react"
import { useAuctionWebsocket } from "Components/useAuctionWebsocket"
import { checkIfArtworkIsOnLoanOrPermanentCollection } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebar"
import { useInquiryContext_artwork$data } from "__generated__/useInquiryContext_artwork.graphql"

export const InquiryConfirmation: React.FC = () => {
  const { next, artworkID, context } = useInquiryContext()
  const {
    isSold,
    isInAuction,
    saleArtwork,
    sale,
    saleMessage,
    artist,
  } = context.current?.artwork as useInquiryContext_artwork$data

  const startAt = sale?.startAt
  const endAt = saleArtwork?.endAt
  const extendedBiddingEndAt = saleArtwork?.extendedBiddingEndAt
  const biddingEndAt = extendedBiddingEndAt ?? endAt

  const [updatedBiddingEndAt, setUpdatedBiddingEndAt] = useState(biddingEndAt)

  useAuctionWebsocket({
    lotID: saleArtwork?.lotID!,
    onChange: ({ extended_bidding_end_at }) => {
      setUpdatedBiddingEndAt(extended_bidding_end_at)
    },
  })

  const { hasEnded } = useTimer(updatedBiddingEndAt!, startAt!)

  const shouldHideDetailsCreateAlertCTA =
    (isInAuction && hasEnded) ||
    (isInAuction && lotIsClosed(sale, saleArtwork)) ||
    isSold

  const entity: SavedSearchEntity = {
    placeholder: artist?.name ?? "",
    owner: {
      type: OwnerType.artist,
      id: artist?.internalID ?? "",
      name: artist?.name ?? "",
      slug: artist?.slug ?? "",
    },
    defaultCriteria: {
      artistIDs: [
        {
          displayValue: artist?.name ?? "",
          value: artist?.internalID ?? "",
        },
      ],
    },
  }

  const criteria: SearchCriteriaAttributes = {
    artistID: artist?.internalID,
  }

  return (
    <Box>
      <Text variant="lg-display" mb={2} pr={2}>
        Your message has been sent
      </Text>

      <Spacer y={4} />

      <Box p={1} backgroundColor="black10">
        <Text variant="sm-display">
          We'll send you an email if the gallery replies to your inquiry.
        </Text>
      </Box>

      <Text variant="sm-display" my={2}>
        Conversation with the gallery will continue{" "}
        <RouterLink inline to="/user/conversations" onClick={next}>
          in the Inbox.
        </RouterLink>
      </Text>

      <Button onClick={next} width="100%">
        Continue Browsing
      </Button>

      {(!shouldHideDetailsCreateAlertCTA ||
        checkIfArtworkIsOnLoanOrPermanentCollection(saleMessage)) && (
        <SavedSearchCreateAlertButtonContainer
          renderButton={({ onClick }) => (
            <Button
              variant="secondaryBlack"
              onClick={() => {
                onClick()
              }}
              width="100%"
              my={1}
            >
              Create Alert
            </Button>
          )}
          entity={entity}
          criteria={criteria}
          onClose={next}
          authDialogOptions={{
            options: {
              title: "Sign up to create your alert",
              afterAuthAction: {
                action: "createAlert",
                kind: "artworks",
                objectId: artworkID,
              },
            },
            analytics: {
              contextModule: ContextModule.artworkSidebar,
              intent: Intent.createAlert,
            },
          }}
        />
      )}
    </Box>
  )
}
