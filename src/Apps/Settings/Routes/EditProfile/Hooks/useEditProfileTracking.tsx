import {
  ActionType,
  ContextModule,
  EditedUserProfile,
  OwnerType,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"

export const useEditProfileTracking = () => {
  const { trackEvent } = useTracking()

  return {
    editedUserProfile: () => {
      const payload: EditedUserProfile = {
        action: ActionType.editedUserProfile,
        context_screen: ContextModule.collectorProfile,
        context_screen_owner_type: OwnerType.editProfile,
        platform: "web",
      }

      trackEvent(payload)
    },
  }
}
