import { ProgressiveOnboardingFollowArtist } from "Components/ProgressiveOnboarding/Components/ProgressiveOnboardingFollowArtist"
import { ProgressiveOnboardingSaveArtwork } from "Components/ProgressiveOnboarding/Components/ProgressiveOnboardingSaveArtwork"
import { ProgressiveOnboardingSavesAndFollows } from "Components/ProgressiveOnboarding/Components/ProgressiveOnboardingSavesAndFollows"
import { ProgressiveOnboardingUserProfile } from "Components/ProgressiveOnboarding/Components/ProgressiveOnboardingUserProfile"
import {
  isDismissed,
  ProgressiveOnboardingTip,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingTip"
import { graphql } from "react-relay"

// In priority order (most important first)
export const TIPS = [
  new ProgressiveOnboardingTip({
    key: "FollowArtist",
    selector: "[data-onboarding='FollowArtist']",
    Component: ProgressiveOnboardingFollowArtist,
    condition: ({ data }) => {
      if (!data.me?.followsAndSaves) return false
      return data.me.followsAndSaves.artistsConnection?.totalCount === 0
    },
    fragment: graphql`
      fragment ProgressiveOnboardingTipsFollowArtist_me on Me {
        followsAndSaves {
          artistsConnection(first: 1) {
            totalCount
          }
        }
      }
    `,
  }),

  new ProgressiveOnboardingTip({
    key: "SaveArtwork",
    selector: "[data-onboarding='SaveArtwork']",
    Component: ProgressiveOnboardingSaveArtwork,
    condition: ({ data }) => {
      if (!data.me?.followsAndSaves) return false
      return data.me.followsAndSaves.artworksConnection?.totalCount === 0
    },
    fragment: graphql`
      fragment ProgressiveOnboardingTipsSaveArtwork_me on Me {
        followsAndSaves {
          artworksConnection(first: 1) {
            totalCount
          }
        }
      }
    `,
  }),

  new ProgressiveOnboardingTip({
    key: "UserProfile",
    selector: "[data-onboarding='UserProfile']",
    Component: ProgressiveOnboardingUserProfile,
    condition: ({ data }) => {
      if (!data.me?.followsAndSaves) return false
      return (
        isDismissed("SaveArtwork") &&
        (data.me.followsAndSaves.artworksConnection?.totalCount ?? 0) > 0
      )
    },
    fragment: graphql`
      fragment ProgressiveOnboardingTipsUserProfile_me on Me {
        followsAndSaves {
          artworksConnection(first: 1) {
            totalCount
          }
        }
      }
    `,
  }),

  new ProgressiveOnboardingTip({
    key: "SavesAndFollows",
    selector: "[data-onboarding='SavesAndFollows']",
    Component: ProgressiveOnboardingSavesAndFollows,
    delay: 250,
    condition: () => {
      if (isDismissed("SavesAndFollows")) return false
      return isDismissed("UserProfile")
    },
  }),
]

const EMPTY = new ProgressiveOnboardingTip({
  key: "Empty",
  selector: "",
  Component: () => null,
  condition: () => false,
})

export const getTip = (key: string) => {
  const tip = TIPS.find(tip => tip.key === key)

  if (!tip) return EMPTY

  return tip
}
