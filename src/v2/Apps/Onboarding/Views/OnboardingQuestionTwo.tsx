import { Flex, Spacer, Text, Join, Box, Pill, Button } from "@artsy/palette"
import { FC } from "react"
import { OnboardingProgress } from "../Components/OnboardingProgress"
import { OnboardingSplitLayout } from "../Components/OnboardingSplitLayout"
import {
  OPTION_COLLECTING_ART_THAT_MOVES_ME,
  OPTION_DEVELOPING_MY_ART_TASTES,
  OPTION_FINDING_GREAT_INVESTMENTS,
  OPTION_KEEP_TRACK_OF_ART,
} from "../config"
import { useOnboardingContext } from "../useOnboardingContext"

export const OnboardingQuestionTwo: FC = () => {
  const { state, dispatch, next } = useOnboardingContext()

  return (
    <OnboardingSplitLayout
      left={<div>TODO: Image</div>}
      right={
        <Flex
          flexDirection="column"
          p={4}
          justifyContent="space-between"
          width="100%"
        >
          <OnboardingProgress />

          <Box width="100%">
            <Text variant="lg-display">
              What do you love most about exploring art?
            </Text>

            <Spacer mt={1} />

            <Text variant="sm-display">Choose as many as you like.</Text>
          </Box>

          <Box>
            <Join separator={<Spacer mt={2} />}>
              {QUESTION_2.map(option => {
                return (
                  <Pill
                    key={option}
                    selected={state.questionTwo.includes(option)}
                    onClick={() => {
                      dispatch({ type: "SET_ANSWER_TWO", payload: option })
                    }}
                  >
                    {option}
                  </Pill>
                )
              })}
            </Join>
          </Box>

          <Button
            disabled={state.questionTwo.length === 0}
            onClick={next}
            width="100%"
          >
            Next
          </Button>
        </Flex>
      }
    />
  )
}

const QUESTION_2 = [
  OPTION_DEVELOPING_MY_ART_TASTES,
  OPTION_KEEP_TRACK_OF_ART,
  OPTION_FINDING_GREAT_INVESTMENTS,
  OPTION_COLLECTING_ART_THAT_MOVES_ME,
]
