import {
  type AuthContextModule,
  type FollowedArgs,
  type FollowedArtist,
  type FollowedGene,
  type FollowedPartner,
  OwnerType,
  type UnfollowedArtist,
  type UnfollowedGene,
  type UnfollowedPartner,
  followedArtist,
  followedGene,
  followedPartner,
  unfollowedArtist,
  unfollowedGene,
  unfollowedPartner,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useCallback } from "react"
import { useTracking } from "react-tracking"

interface UseFollowButtonTracking {
  ownerType: OwnerType
  ownerId: string
  ownerSlug: string
  contextModule: AuthContextModule
}

export const useFollowButtonTracking = ({
  ownerType,
  ownerId,
  ownerSlug,
  contextModule,
}: UseFollowButtonTracking) => {
  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const { trackEvent } = useTracking()

  const trackFollow = useCallback(
    (isFollowed: boolean) => {
      const args: FollowedArgs = {
        ownerId,
        ownerSlug,
        contextModule,
        contextOwnerId: contextPageOwnerId,
        contextOwnerSlug: contextPageOwnerSlug,
        contextOwnerType: contextPageOwnerType!,
      }

      let followPayload: FollowedPartner | FollowedArtist | FollowedGene

      let unfollowPayload: UnfollowedPartner | UnfollowedArtist | UnfollowedGene

      switch (ownerType) {
        case OwnerType.profile:
          followPayload = followedPartner(args)
          unfollowPayload = unfollowedPartner(args)
          break
        case OwnerType.artist:
          followPayload = followedArtist(args)
          unfollowPayload = unfollowedArtist(args)
          break
        case OwnerType.gene:
          followPayload = followedGene(args)
          unfollowPayload = unfollowedGene(args)
          break
        default:
          throw new Error("Unrecognized owner type")
      }

      trackEvent(isFollowed ? unfollowPayload : followPayload)
    },
    [
      contextModule,
      contextPageOwnerId,
      contextPageOwnerSlug,
      contextPageOwnerType,
      ownerType,
      ownerId,
      ownerSlug,
      trackEvent,
    ],
  )

  return { trackFollow }
}
