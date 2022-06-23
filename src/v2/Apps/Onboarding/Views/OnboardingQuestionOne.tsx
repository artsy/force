import { Flex, Spacer, Text, Box, Join, Button, Pill } from "@artsy/palette"
import { FC } from "react"
import { OnboardingProgress } from "../Components/OnboardingProgress"
import { OnboardingSplitLayout } from "../Components/OnboardingSplitLayout"
import {
  OPTION_NO_IM_JUST_STARTING_OUT,
  OPTION_YES_I_LOVE_COLLECTING_ART,
} from "../config"
import { useOnboardingContext } from "../useOnboardingContext"

export const OnboardingQuestionOne: FC = () => {
  const { next, dispatch, state } = useOnboardingContext()

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
            <Text variant="lg-display">Have you bought art before?</Text>

            <Spacer mt={4} />

            <Box>
              <Join separator={<Spacer mt={2} />}>
                {QUESTION_1.map(option => {
                  return (
                    <Pill
                      key={option}
                      size="small"
                      selected={state.questionOne === option}
                      onClick={() => {
                        dispatch({ type: "SET_ANSWER_ONE", payload: option })
                      }}
                    >
                      {option}
                    </Pill>
                  )
                })}
              </Join>
            </Box>
          </Box>

          <Button disabled={!state.questionOne} onClick={next} width="100%">
            Next
          </Button>
        </Flex>
      }
    />
  )
}

const QUESTION_1 = [
  OPTION_YES_I_LOVE_COLLECTING_ART,
  OPTION_NO_IM_JUST_STARTING_OUT,
]
