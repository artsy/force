import {
  AuthContextModule,
  FollowedArgs,
  followedPartner,
  unfollowedPartner,
} from "@artsy/cohesion"
import { useCallback } from "react"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System"

interface UseFollowButtonTracking {
  ownerId: string
  ownerSlug: string
  contextModule: AuthContextModule
}

export const useFollowButtonTracking = ({
  ownerId,
  ownerSlug,
  contextModule,
}: UseFollowButtonTracking) => {
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const { trackEvent } = useTracking()

  const trackFollow = useCallback(
    (isFollowed: boolean) => {
      if (
        !contextPageOwnerId ||
        !contextPageOwnerSlug ||
        !contextPageOwnerType
      ) {
        return
      }

      const args: FollowedArgs = {
        ownerId,
        ownerSlug,
        contextModule,
        contextOwnerId: contextPageOwnerId,
        contextOwnerSlug: contextPageOwnerSlug,
        contextOwnerType: contextPageOwnerType,
      }

      trackEvent(isFollowed ? unfollowedPartner(args) : followedPartner(args))
    },
    [
      contextModule,
      contextPageOwnerId,
      contextPageOwnerSlug,
      contextPageOwnerType,
      ownerId,
      ownerSlug,
      trackEvent,
    ]
  )

  return { trackFollow }
}
