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
} from "../config"
import { useOnboardingContext } from "../Hooks/useOnboardingContext"
import { OnboardingWelcome } from "../Views/OnboardingWelcome"
import { OnboardingQuestionOne } from "../Views/OnboardingQuestionOne"
import { OnboardingQuestionThree } from "../Views/OnboardingQuestionThree"
import { OnboardingQuestionTwo } from "../Views/OnboardingQuestionTwo"
import { OnboardingFollowArtists } from "../Views/OnboardingFollowArtists"
import { OnboardingTopAuctionLots } from "../Views/OnboardingTopAuctionLots"
import { OnboardingCuratedArtworks } from "../Views/OnboardingCuratedArtworks"
import { OnboardingArtistsOnTheRise } from "../Views/OnboardingArtistsOnTheRise"
import { OnboardingFollowGalleries } from "../Views/OnboardingFollowGalleries"
import { OnboardingThankYou } from "../Views/OnboardingThankYou"

interface OnboardingStepsProps {}

export const OnboardingSteps: FC<OnboardingStepsProps> = () => {
  const { current } = useOnboardingContext()

  switch (current) {
    case VIEW_WELCOME:
      return <OnboardingWelcome />

    case VIEW_QUESTION_ONE:
      return <OnboardingQuestionOne />

    case VIEW_QUESTION_TWO:
      return <OnboardingQuestionTwo />

    case VIEW_QUESTION_THREE:
      return <OnboardingQuestionThree />

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
