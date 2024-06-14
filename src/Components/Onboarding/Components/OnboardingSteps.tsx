import { FC } from "react"
import {
  VIEW_CURATED_ARTWORKS,
  VIEW_WELCOME,
  VIEW_QUESTION_ONE,
  VIEW_QUESTION_TWO,
  VIEW_QUESTION_THREE,
  VIEW_TOP_AUCTION_LOTS,
  VIEW_FOLLOW_GALLERIES,
  VIEW_FOLLOW_ARTISTS,
  VIEW_ARTISTS_ON_THE_RISE,
  VIEW_THANK_YOU,
  VIEW_ART_QUIZ,
} from "Components/Onboarding/config"
import { useOnboardingContext } from "Components/Onboarding/Hooks/useOnboardingContext"
import { OnboardingWelcome } from "Components/Onboarding/Views/OnboardingWelcome"
import { OnboardingQuestionOne } from "Components/Onboarding/Views/OnboardingQuestionOne"
import { OnboardingQuestionThree } from "Components/Onboarding/Views/OnboardingQuestionThree"
import { OnboardingQuestionTwo } from "Components/Onboarding/Views/OnboardingQuestionTwo"
import { OnboardingFollowArtists } from "Components/Onboarding/Views/OnboardingFollowArtists"
import { OnboardingTopAuctionLots } from "Components/Onboarding/Views/OnboardingTopAuctionLots"
import { OnboardingCuratedArtworks } from "Components/Onboarding/Views/OnboardingCuratedArtworks"
import { OnboardingArtistsOnTheRise } from "Components/Onboarding/Views/OnboardingArtistsOnTheRise"
import { OnboardingFollowGalleries } from "Components/Onboarding/Views/OnboardingFollowGalleries"
import { OnboardingThankYou } from "Components/Onboarding/Views/OnboardingThankYou"
import { useRouter } from "System/Hooks/useRouter"
import { useOnboardingTracking } from "Components/Onboarding/Hooks/useOnboardingTracking"

interface OnboardingStepsProps {}

export const OnboardingSteps: FC<OnboardingStepsProps> = () => {
  const { router } = useRouter()

  const tracking = useOnboardingTracking()

  const { current, onComplete, onClose } = useOnboardingContext()

  switch (current) {
    case VIEW_WELCOME:
      return <OnboardingWelcome />

    case VIEW_QUESTION_ONE:
      return <OnboardingQuestionOne />

    case VIEW_QUESTION_TWO:
      return <OnboardingQuestionTwo />

    case VIEW_QUESTION_THREE:
      return <OnboardingQuestionThree />

    case VIEW_ART_QUIZ: {
      tracking.userCompletedOnboarding()
      onComplete()
      onClose()
      router.push("/art-quiz/welcome")
      return null
    }

    case VIEW_FOLLOW_ARTISTS:
      return <OnboardingFollowArtists />

    case VIEW_TOP_AUCTION_LOTS:
      return <OnboardingTopAuctionLots />

    case VIEW_CURATED_ARTWORKS:
      return <OnboardingCuratedArtworks />

    case VIEW_ARTISTS_ON_THE_RISE:
      return <OnboardingArtistsOnTheRise />

    case VIEW_FOLLOW_GALLERIES:
      return <OnboardingFollowGalleries />

    case VIEW_THANK_YOU:
      return (
        <OnboardingThankYou
          autoClose
          message={
            <>
              Great start <br />
              Follow more as you browse and continue tailoring Artsy to your
              tastes
            </>
          }
        />
      )

    default:
      return null
  }
}
