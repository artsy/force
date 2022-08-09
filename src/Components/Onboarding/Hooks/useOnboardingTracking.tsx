import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System"
import {
  ActionType,
  ContextModule,
  StartedOnboarding,
  CompletedOnboarding,
  OnboardingUserInputData,
  // FollowedArtist,
  // FollowedPartner,
  // FollowedGene,
  // followedPartner,
  // unfollowedPartner,
  // followedArtist,
  // unfollowedArtist,
  // followedGene,
  // unfollowedGene,
} from "@artsy/cohesion"

export const useOnboardingTracking = () => {
  const { trackEvent } = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerType,
    contextPageOwnerSlug,
  } = useAnalyticsContext()

  if (!contextPageOwnerId || !contextPageOwnerType || !contextPageOwnerSlug) {
    console.warn("Missing analytics context")
  }

  const context = {
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_type: contextPageOwnerType,
    context_page_owner_slug: contextPageOwnerSlug,
  }

  return {
    // user clicks get started
    userStartedOnboarding: () => {
      const payload: StartedOnboarding = {
        action: ActionType.startedOnboarding,
        ...context,
      }

      trackEvent(payload)
    },

    // user clicks next after answering "have you bought art before"
    userAnsweredCollectorQuestion: () => {
      const payload: OnboardingUserInputData = {
        action: ActionType.onboardingUserInputData,
        context_module: ContextModule.onboardingCollectorLevel,
        data_input: "[userCollectorLevel]",
        ...context,
      }

      trackEvent(payload)
    },

    // user clicks next after answering "what do you love most about art"
    userAnsweredInterestQuestion: () => {
      const payload: OnboardingUserInputData = {
        action: ActionType.onboardingUserInputData,
        context_module: ContextModule.onboardingInterests,
        data_input: "[userInterests]",
        ...context,
      }

      trackEvent(payload)
    },

    // user clicks next after answering "what would you like to see first"
    userAnsweredActivityQuestion: () => {
      const payload: OnboardingUserInputData = {
        action: ActionType.onboardingUserInputData,
        context_module: ContextModule.onboardingActivity,
        data_input: "[userActivity]",
        ...context,
      }

      trackEvent(payload)
    },

    // user follows or unfollows a artist
    trackArtistFollows: isFollowed => {
      // const payload: FollowedArtist = {
      //   action: ActionType.followedArtist,
      //   context_module: ContextModule.onboardingFlow,
      //   ...context,
      // }
      // change payload based on follow or unfollow
      // trackEvent(isFollowed ? unfollowedArtist() : followedArtist())
    },

    // user follows or unfollows a gallery
    trackGalleryFollows: isFollowed => {
      // const payload: FollowedPartner = {
      //   action: ActionType.followedPartner,
      //   context_module: ContextModule.onboardingFlow,
      //   ...context,
      // }
      // change payload based on follow or unfollow
      // trackEvent(isFollowed ? unfollowedPartner() : followedPartner())
    },

    // user follows or unfollows a gene
    trackGeneFollows: isFollowed => {
      // const payload: FollowedGene = {
      //   action: ActionType.followedGene,
      //   context_module: ContextModule.onboardingFlow,
      //   ...context,
      // }
      // change payload based on follow or unfollow
      // trackEvent(isFollowed ? unfollowedGene() : followedGene())
    },

    // whenever we decide onboarding is complete
    userCompletedOnboarding: () => {
      const payload: CompletedOnboarding = {
        action: ActionType.completedOnboarding,
      }

      trackEvent(payload)
    },
  }
}
