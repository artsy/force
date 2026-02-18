import {
  ActionType,
  ContextModule,
  type EditProfileModalViewed,
  type EditedUserProfile,
  OwnerType,
  type TappedMyCollectionAddArtworkArtist,
} from "@artsy/cohesion"
import { Box, Stack, Text } from "@artsy/palette"
import { CollectorProfileArtistsAdd } from "Components/CollectorProfile/CollectorProfileArtistsAdd"
import { useInquiryContext } from "Components/Inquiry/Hooks/useInquiryContext"
import { useUpdateMyUserProfile } from "Components/Inquiry/Hooks/useUpdateMyUserProfile"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useOnce } from "Utils/Hooks/useOnce"
import type { FC } from "react"
import type { Environment } from "react-relay"
import { useTracking } from "react-tracking"

export const InquiryArtistsInCollection: FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { next, relayEnvironment, context } = useInquiryContext()

  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile({
    relayEnvironment: relayEnvironment.current as Environment,
  })

  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()
  const { trackEvent } = useTracking()

  useOnce(() => {
    submitUpdateMyUserProfile({
      promptedForUpdate: true,
    })

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

    const tappedMyCollectionAddArtworkArtist: TappedMyCollectionAddArtworkArtist =
      {
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
        <Text variant="lg-display">
          Already own works by this artist or similar artists?
        </Text>

        <Text variant="sm">
          Showcase your collection and stand out with galleries.
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
