import { FC } from "react"
import { Text, Button, Flex, Spacer, Box } from "@artsy/palette"
import {
  OnboardingProvider,
  useOnboardingContext,
} from "./useOnboardingContext"
import { useRouter } from "v2/System/Router/useRouter"
import { OnboardingWelcome } from "./Views/OnboardingWelcome"
import { OnboardingQuestionOne } from "./Views/OnboardingQuestionOne"
import { OnboardingQuestionTwo } from "./Views/OnboardingQuestionTwo"
import { OnboardingDone } from "./Views/OnboardingDone"
import {
  VIEW_AUCTION_HIGHLIGHTS,
  VIEW_CURATED_ARTWORKS,
  VIEW_SEARCH_ARTISTS,
  VIEW_SEARCH_ARTWORKS,
  VIEW_SEARCH_GALLERIES,
  VIEW_TRENDING_ARTISTS,
  VIEW_TRENDING_LOTS,
} from "./config"
import { OnboardingProgress } from "./Components/OnboardingProgress"

export const OnboardingApp: FC = () => {
  const { router } = useRouter()

  const handleDone = () => {
    router.push("/")
  }

  return (
    <OnboardingProvider onDone={handleDone}>
      <OnboardingDebug />

      <Spacer mt={2} />

      <OnboardingSteps />
    </OnboardingProvider>
  )
}

const OnboardingSteps: FC = () => {
  const { current, next } = useOnboardingContext()

  switch (current) {
    case "Welcome":
      return <OnboardingWelcome />

    case "WhatDoYouLoveMost":
      return (
        <>
          <OnboardingProgress />
          <Spacer mt={1} />
          <OnboardingQuestionOne />
        </>
      )

    case "WhereWouldYouLikeToDiveIn":
      return (
        <>
          <OnboardingProgress />
          <Spacer mt={1} />
          <OnboardingQuestionTwo />
        </>
      )

    case "Done":
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

const OnboardingDebug: FC = () => {
  const { current, answers, progress, engine } = useOnboardingContext()

  return (
    <Box as="pre" border="1px dotted" borderColor="black60" p={2}>
      {JSON.stringify(
        {
          current,
          answers,
          position: `${engine.position()}/${engine.total()}`,
          progress: `${progress}%`,
        },
        null,
        2
      )}
    </Box>
  )
}
