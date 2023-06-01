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

export const InquiryConfirmation: React.FC = () => {
  const { next, artworkID, context } = useInquiryContext()
  const { artist } = context.current?.artwork || {}

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
    </Box>
  )
}
