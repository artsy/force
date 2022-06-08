import { Flex, Spacer, Text, Box, Join, Button } from "@artsy/palette"
import { FC } from "react"
import {
  OPTION_COLLECTING_ART_THAT_MOVES_ME,
  OPTION_FINDING_MY_NEXT_GREAT_INVESTMENT,
  OPTION_GROW_MY_TASTE_IN_ART,
  OPTION_KEEPING_TRACK_OF_ART_I_AM_INTERESTED_IN,
} from "../config"
import { useOnboardingContext } from "../useOnboardingContext"

export const OnboardingQuestionOne: FC = () => {
  const { next, setAnswerOne } = useOnboardingContext()

  return (
    <Flex flexDirection="column">
      <Text variant="xs">First, choose the option that fits you best.</Text>

      <Spacer mt={1} />

      <Text variant="lg-display">
        What do you love most about collecting art?
      </Text>

      <Spacer mt={4} />

      <Box>
        <Join separator={<Spacer mt={2} />}>
          {QUESTION_1.map(option => {
            return (
              <Button
                key={option}
                size="small"
                variant="secondaryBlack"
                onClick={() => {
                  setAnswerOne(option)
                  next()
                }}
              >
                {option}
              </Button>
            )
          })}
        </Join>
      </Box>
    </Flex>
  )
}

const QUESTION_1 = [
  OPTION_GROW_MY_TASTE_IN_ART,
  OPTION_KEEPING_TRACK_OF_ART_I_AM_INTERESTED_IN,
  OPTION_FINDING_MY_NEXT_GREAT_INVESTMENT,
  OPTION_COLLECTING_ART_THAT_MOVES_ME,
]
