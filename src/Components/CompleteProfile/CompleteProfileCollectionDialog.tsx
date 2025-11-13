import { CollectorProfileArtistsAddDialog } from "Components/CollectorProfile/CollectorProfileArtistsAddDialog"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import {
  ActionType,
  ContextModule,
  type EditedUserProfile,
  OwnerType,
  type TappedMyCollectionAddArtworkArtist,
} from "@artsy/cohesion"
import type { FC } from "react"
import { useTracking } from "react-tracking"

interface CompleteProfileCollectionDialogProps {
  onClose: () => void
}

export const CompleteProfileCollectionDialog: FC<
  React.PropsWithChildren<CompleteProfileCollectionDialogProps>
> = ({ onClose }) => {
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()
  const { trackEvent } = useTracking()

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
  }

  return (
    <CollectorProfileArtistsAddDialog
      title="Tell us about the artists in your collection."
      onClose={onClose}
      onSuccess={handleSuccess}
    />
  )
}
