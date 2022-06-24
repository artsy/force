import { Flex, Spacer, Text, Join, Box, Pill, Button } from "@artsy/palette"
import { FC, useMemo } from "react"
import { OnboardingProgress } from "../Components/OnboardingProgress"
import { OnboardingSplitLayout } from "../Components/OnboardingSplitLayout"
import {
  OPTION_ARTISTS_ON_THE_RISE,
  OPTION_A_CURATED_SELECTION_OF_ARTWORKS,
  OPTION_DEVELOPING_MY_ART_TASTES,
  OPTION_FINDING_GREAT_INVESTMENTS,
  OPTION_FOLLOW_ARTISTS_IM_INTERESTED_IN,
  OPTION_FOLLOW_GALLERIES_I_LOVE,
  OPTION_KEEP_TRACK_OF_ART,
  OPTION_TOP_AUCTION_LOTS,
} from "../config"
import { useOnboardingFadeTransition } from "../Hooks/useOnboardingFadeTransition"
import { useOnboardingContext } from "../useOnboardingContext"

export const OnboardingQuestionThree: FC = () => {
  const { state, dispatch, next } = useOnboardingContext()
  const { register, loading, handleNext } = useOnboardingFadeTransition({
    next,
  })

  const options = useMemo(() => {
    switch (true) {
      case state.questionTwo.length > 1:
        return [
          OPTION_FOLLOW_ARTISTS_IM_INTERESTED_IN,
          OPTION_TOP_AUCTION_LOTS,
          OPTION_A_CURATED_SELECTION_OF_ARTWORKS,
          OPTION_ARTISTS_ON_THE_RISE,
        ]

      case state.questionTwo[0] === OPTION_DEVELOPING_MY_ART_TASTES:
        return [
          OPTION_TOP_AUCTION_LOTS,
          OPTION_A_CURATED_SELECTION_OF_ARTWORKS,
          OPTION_ARTISTS_ON_THE_RISE,
        ]

      case state.questionTwo[0] === OPTION_KEEP_TRACK_OF_ART:
        return [
          OPTION_FOLLOW_ARTISTS_IM_INTERESTED_IN,
          OPTION_FOLLOW_GALLERIES_I_LOVE,
        ]

      case state.questionTwo[0] === OPTION_FINDING_GREAT_INVESTMENTS:
        return [
          OPTION_FOLLOW_ARTISTS_IM_INTERESTED_IN,
          OPTION_TOP_AUCTION_LOTS,
          OPTION_ARTISTS_ON_THE_RISE,
        ]

      default:
        return []
    }
  }, [state.questionTwo])

  return (
    <OnboardingSplitLayout
      left={
        // TODO: Replace with image
        <Box ref={register(0)} width="100%" height="100%" bg="black60" />
      }
      right={
        <Flex
          flexDirection="column"
          p={4}
          justifyContent="space-between"
          width="100%"
        >
          <OnboardingProgress />

          <Box width="100%">
            <Text variant="lg-display" ref={register(1)}>
              Where would you like to dive in first?
            </Text>

            <Spacer mt={1} />

            <Text variant="sm-display" ref={register(2)}>
              Choose one to start exploring.
            </Text>
          </Box>

          <Box ref={register(3)}>
            <Join separator={<Spacer mt={2} />}>
              {options.map(option => {
                return (
                  <Pill
                    key={option}
                    selected={state.questionThree === option}
                    onClick={() => {
                      dispatch({ type: "SET_ANSWER_THREE", payload: option })
                    }}
                  >
                    {option}
                  </Pill>
                )
              })}
            </Join>
          </Box>

          <Button
            disabled={state.questionThree === null || loading}
            loading={loading}
            onClick={handleNext}
            width="100%"
          >
            Next
          </Button>
        </Flex>
      }
    />
  )
}
