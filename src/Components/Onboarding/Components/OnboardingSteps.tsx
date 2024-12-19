import { useOnboardingContext } from "Components/Onboarding/Hooks/useOnboardingContext"
import { OnboardingArtistsOnTheRise } from "Components/Onboarding/Views/OnboardingArtistsOnTheRise"
import { OnboardingCuratedArtworks } from "Components/Onboarding/Views/OnboardingCuratedArtworks"
import { OnboardingFollowArtists } from "Components/Onboarding/Views/OnboardingFollowArtists"
import { OnboardingFollowGalleries } from "Components/Onboarding/Views/OnboardingFollowGalleries"
import { OnboardingQuestionOne } from "Components/Onboarding/Views/OnboardingQuestionOne"
import { OnboardingQuestionThree } from "Components/Onboarding/Views/OnboardingQuestionThree"
import { OnboardingQuestionTwo } from "Components/Onboarding/Views/OnboardingQuestionTwo"
import { OnboardingThankYou } from "Components/Onboarding/Views/OnboardingThankYou"
import { OnboardingTopAuctionLots } from "Components/Onboarding/Views/OnboardingTopAuctionLots"
import { OnboardingWelcome } from "Components/Onboarding/Views/OnboardingWelcome"
import {
  VIEW_ARTISTS_ON_THE_RISE,
  VIEW_ART_QUIZ,
  VIEW_CURATED_ARTWORKS,
  VIEW_FOLLOW_ARTISTS,
  VIEW_FOLLOW_GALLERIES,
  VIEW_QUESTION_ONE,
  VIEW_QUESTION_THREE,
  VIEW_QUESTION_TWO,
  VIEW_THANK_YOU,
  VIEW_TOP_AUCTION_LOTS,
  VIEW_WELCOME,
} from "Components/Onboarding/config"
import { useRouter } from "System/Hooks/useRouter"
import type { FC } from "react"

type OnboardingStepsProps = {}

export const OnboardingSteps: FC<
  React.PropsWithChildren<OnboardingStepsProps>
> = () => {
  const { router } = useRouter()

  const { current, next } = useOnboardingContext()

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
      next()
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
