import { Flex, Spacer, Text, Box, Join, Button, Pill } from "@artsy/palette"
import { FC } from "react"
import { OnboardingProgress } from "../Components/OnboardingProgress"
import { OnboardingSplitLayout } from "../Components/OnboardingSplitLayout"
import {
  OPTION_COLLECTING_ART_THAT_MOVES_ME,
  OPTION_FINDING_MY_NEXT_GREAT_INVESTMENT,
  OPTION_GROW_MY_TASTE_IN_ART,
  OPTION_KEEPING_TRACK_OF_ART_I_AM_INTERESTED_IN,
} from "../config"
import { useOnboardingContext } from "../useOnboardingContext"

export const OnboardingQuestionOne: FC = () => {
  const { next, setAnswerOne, answers } = useOnboardingContext()

  return (
    <OnboardingSplitLayout
      left={<div>TODO: Image</div>}
      right={
        <Flex flexDirection="column" p={4} justifyContent="space-between">
          <OnboardingProgress />

          <Box width="100%">
            <Text variant="xs">
              First, choose the option that fits you best.
            </Text>

            <Spacer mt={1} />

            <Text variant="lg-display">
              What do you love most about collecting art?
            </Text>

            <Spacer mt={4} />

            <Box>
              <Join separator={<Spacer mt={2} />}>
                {QUESTION_1.map(option => {
                  return (
                    <Pill
                      key={option}
                      size="small"
                      selected={answers[0] === option}
                      onClick={() => {
                        setAnswerOne(option)
                      }}
                    >
                      {option}
                    </Pill>
                  )
                })}
              </Join>
            </Box>
          </Box>

          <Button disabled={answers[0] === null} onClick={next} width="100%">
            Next
          </Button>
        </Flex>
      }
    />
  )
}

const QUESTION_1 = [
  OPTION_GROW_MY_TASTE_IN_ART,
  OPTION_KEEPING_TRACK_OF_ART_I_AM_INTERESTED_IN,
  OPTION_FINDING_MY_NEXT_GREAT_INVESTMENT,
  OPTION_COLLECTING_ART_THAT_MOVES_ME,
]
