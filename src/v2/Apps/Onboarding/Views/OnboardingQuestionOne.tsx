import { Flex, Spacer, Text, Box, Join, Button, Pill } from "@artsy/palette"
import { FC } from "react"
import { OnboardingProgress } from "../Components/OnboardingProgress"
import { OnboardingSplitLayout } from "../Components/OnboardingSplitLayout"
import {
  OPTION_NO_IM_JUST_STARTING_OUT,
  OPTION_YES_I_LOVE_COLLECTING_ART,
} from "../config"
import { useOnboardingFadeTransition } from "../Hooks/useOnboardingFadeTransition"
import { useOnboardingContext } from "../useOnboardingContext"

export const OnboardingQuestionOne: FC = () => {
  const { next, dispatch, state } = useOnboardingContext()
  const { register, loading, handleNext } = useOnboardingFadeTransition({
    next,
  })

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
          <OnboardingProgress preview={loading} />

          <Box width="100%">
            <Text variant="lg-display" ref={register(1)}>
              Have you bought art before?
            </Text>

            <Spacer mt={4} />

            <Box ref={register(2)}>
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

          <Button
            disabled={!state.questionOne || loading}
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

const QUESTION_1 = [
  OPTION_YES_I_LOVE_COLLECTING_ART,
  OPTION_NO_IM_JUST_STARTING_OUT,
]
