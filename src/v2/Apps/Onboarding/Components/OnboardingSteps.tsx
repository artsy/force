import { Button, Text, Flex, Spacer } from "@artsy/palette"
import { FC } from "react"
import {
  VIEW_AUCTION_HIGHLIGHTS,
  VIEW_CURATED_ARTWORKS,
  VIEW_DONE,
  VIEW_SEARCH_ARTISTS,
  VIEW_SEARCH_ARTWORKS,
  VIEW_SEARCH_GALLERIES,
  VIEW_TRENDING_ARTISTS,
  VIEW_TRENDING_LOTS,
  VIEW_WELCOME,
  VIEW_WHAT_DO_YOU_LOVE_MOST,
  VIEW_WHERE_WOULD_YOU_LIKE_TO_DIVE_IN,
} from "../config"
import { useOnboardingContext } from "../useOnboardingContext"
import { OnboardingDone } from "../Views/OnboardingDone"
import { OnboardingQuestionOne } from "../Views/OnboardingQuestionOne"
import { OnboardingQuestionTwo } from "../Views/OnboardingQuestionTwo"
import { OnboardingWelcome } from "../Views/OnboardingWelcome"
import { OnboardingProgress } from "./OnboardingProgress"

interface OnboardingStepsProps {}

export const OnboardingSteps: FC<OnboardingStepsProps> = () => {
  const { current, next } = useOnboardingContext()

  switch (current) {
    case VIEW_WELCOME:
      return <OnboardingWelcome />

    case VIEW_WHAT_DO_YOU_LOVE_MOST:
      return <OnboardingQuestionOne />

    case VIEW_WHERE_WOULD_YOU_LIKE_TO_DIVE_IN:
      return (
        <>
          <OnboardingProgress />
          <Spacer mt={1} />
          <OnboardingQuestionTwo />
        </>
      )

    case VIEW_DONE:
      return <OnboardingDone />

    case VIEW_AUCTION_HIGHLIGHTS:
    case VIEW_CURATED_ARTWORKS:
    case VIEW_SEARCH_ARTISTS:
    case VIEW_SEARCH_ARTWORKS:
    case VIEW_SEARCH_GALLERIES:
    case VIEW_TRENDING_ARTISTS:
    case VIEW_TRENDING_LOTS:
      return (
        <Flex flexDirection="column">
          <Text variant="lg-display">TODO: {current}</Text>

          <Spacer mt={4} />

          <Button onClick={next}>Done</Button>
        </Flex>
      )

    default:
      return null
  }
}
