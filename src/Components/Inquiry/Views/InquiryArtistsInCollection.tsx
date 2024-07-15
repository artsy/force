import {
  ActionType,
  ContextModule,
  EditedUserProfile,
  EditProfileModalViewed,
  OwnerType,
  TappedMyCollectionAddArtworkArtist,
} from "@artsy/cohesion"
import { Box, Stack, Text } from "@artsy/palette"
import { CollectorProfileArtistsAdd } from "Components/CollectorProfile/CollectorProfileArtistsAdd"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { FC } from "react"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useOnce } from "Utils/Hooks/useOnce"

export const InquiryArtistsInCollection: FC = () => {
  const { next, relayEnvironment, context } = useInquiryContext()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()
  const { trackEvent } = useTracking()

  useOnce(() => {
    const payload: EditProfileModalViewed = {
      action: ActionType.editProfileModalViewed,
      context_module: ContextModule.inquiry,
      context_page_owner_type: contextPageOwnerType,
      user_id: context.current?.internalID ?? "guest",
      inquiry_id: context.current?.inquiryID ?? "unknown",
      platform: "web",
    }

    trackEvent(payload)
  })

  const handleSuccess = () => {
    const editedUserProfile: EditedUserProfile = {
      action: ActionType.editedUserProfile,
      context_screen: ContextModule.inquiry,
      context_screen_owner_type: contextPageOwnerType,
      platform: "web",
    }

    const tappedMyCollectionAddArtworkArtist: TappedMyCollectionAddArtworkArtist = {
      action: ActionType.tappedMyCollectionAddArtworkArtist,
      context_screen: OwnerType.myCollectionAddArtworkArtist, // FIXME: Should probably be ContextModule?
      context_module: ContextModule.myCollectionAddArtworkAddArtist,
      context_screen_owner_id: contextPageOwnerId,
      context_screen_owner_slug: contextPageOwnerSlug,
      platform: "web",
    }

    trackEvent(editedUserProfile)
    trackEvent(tappedMyCollectionAddArtworkArtist)

    next()
  }

  return (
    <Stack gap={2} height="100%">
      <Box>
        <Text variant="lg-display">Add artists to My Collection:</Text>

        <Text variant="sm">
          Show off your collection and make a great impression.
        </Text>
      </Box>

      <Box flex={1} overflow="hidden">
        <CollectorProfileArtistsAdd
          relayEnvironment={relayEnvironment.current}
          onSuccess={handleSuccess}
          onCancel={next}
        />
      </Box>
    </Stack>
  )
}
