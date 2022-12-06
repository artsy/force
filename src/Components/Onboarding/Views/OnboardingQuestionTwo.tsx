import { Spacer, Text, Join, Box, Pill } from "@artsy/palette"
import { FC } from "react"
import { OnboardingFigure } from "../Components/OnboardingFigure"
import { OnboardingQuestionPanel } from "../Components/OnboardingQuestionPanel"
import {
  OPTION_COLLECTING_ART_THAT_MOVES_ME,
  OPTION_DEVELOPING_MY_ART_TASTES,
  OPTION_FINDING_GREAT_INVESTMENTS,
  OPTION_KEEP_TRACK_OF_ART,
} from "../config"
import { useOnboardingFadeTransition } from "../Hooks/useOnboardingFadeTransition"
import { useOnboardingContext } from "../Hooks/useOnboardingContext"
import { useOnboardingTracking } from "../Hooks/useOnboardingTracking"
import { SplitLayout } from "Components/SplitLayout"

export const OnboardingQuestionTwo: FC = () => {
  const { state, dispatch, next } = useOnboardingContext()
  const { register, loading, handleNext } = useOnboardingFadeTransition({
    next,
  })

  const tracking = useOnboardingTracking()

  return (
    <SplitLayout
      left={
        <OnboardingFigure
          ref={register(0)}
          src="https://files.artsy.net/images/question-two-img.jpg"
          aspectWidth={1600}
          aspectHeight={2764}
          caption="Alex Katz, Yellow Flags 3, 2020"
        />
      }
      right={
        <OnboardingQuestionPanel
          disabled={state.questionTwo.length === 0 || loading}
          loading={loading}
          onNext={() => {
            tracking.trackQuestionTwo(state.questionTwo)
            handleNext()
          }}
        >
          <Text variant="lg-display" ref={register(1)}>
            What do you love most about art?
          </Text>

          <Spacer y={1} />

          <Text variant="sm-display" ref={register(2)}>
            Choose as many as you like.
          </Text>

          <Box ref={register(3)} mt={4}>
            <Join separator={<Spacer y={2} />}>
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
        </OnboardingQuestionPanel>
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
