import { Button, Text, Flex, Spacer } from "@artsy/palette"
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
} from "../config"
import { useOnboardingContext } from "../useOnboardingContext"
import { OnboardingWelcome } from "../Views/OnboardingWelcome"
import { OnboardingQuestionOne } from "../Views/OnboardingQuestionOne"
import { OnboardingQuestionThree } from "../Views/OnboardingQuestionThree"
import { OnboardingQuestionTwo } from "../Views/OnboardingQuestionTwo"

interface OnboardingStepsProps {}

export const OnboardingSteps: FC<OnboardingStepsProps> = () => {
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

    case VIEW_FOLLOW_ARTISTS:
    case VIEW_TOP_AUCTION_LOTS:
    case VIEW_CURATED_ARTWORKS:
    case VIEW_ARTISTS_ON_THE_RISE:
    case VIEW_FOLLOW_GALLERIES:
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
