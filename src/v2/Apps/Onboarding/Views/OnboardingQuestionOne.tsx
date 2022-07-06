import { Spacer, Text, Box, Join, Pill } from "@artsy/palette"
import { FC } from "react"
import { OnboardingFigure } from "../Components/OnboardingFigure"
import { OnboardingQuestionPanel } from "../Components/OnboardingQuestionPanel"
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
        <OnboardingFigure
          ref={register(0)}
          src="https://files.artsy.net/images/question-one-img.jpg"
          aspectWidth={1600}
          aspectHeight={2764}
          caption="Adegboyega Adesina, Painting of Rechel, 2021"
        />
      }
      right={
        <OnboardingQuestionPanel
          loading={loading}
          disabled={!state.questionOne || loading}
          onNext={handleNext}
        >
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
        </OnboardingQuestionPanel>
      }
    />
  )
}

const QUESTION_1 = [
  OPTION_YES_I_LOVE_COLLECTING_ART,
  OPTION_NO_IM_JUST_STARTING_OUT,
]
