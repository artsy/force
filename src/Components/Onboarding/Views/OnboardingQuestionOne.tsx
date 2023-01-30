import { Spacer, Text, Box, Join, Pill } from "@artsy/palette"
import { FC } from "react"
import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { OnboardingFigure } from "Components/Onboarding/Components/OnboardingFigure"
import { OnboardingQuestionPanel } from "Components/Onboarding/Components/OnboardingQuestionPanel"
import {
  OPTION_NO_IM_JUST_STARTING_OUT,
  OPTION_YES_I_LOVE_COLLECTING_ART,
} from "Components/Onboarding/config"
import { useOnboardingFadeTransition } from "Components/Onboarding/Hooks/useOnboardingFadeTransition"
import { useOnboardingContext } from "Components/Onboarding/Hooks/useOnboardingContext"
import { OnboardingQuestionOneMutation } from "__generated__/OnboardingQuestionOneMutation.graphql"
import { useOnboardingTracking } from "Components/Onboarding/Hooks/useOnboardingTracking"
import { SplitLayout } from "Components/SplitLayout"

export const OnboardingQuestionOne: FC = () => {
  const { next, dispatch, state } = useOnboardingContext()
  const {
    register,
    loading,
    handleNext: __handleNext__,
  } = useOnboardingFadeTransition({
    next,
  })

  const { submitMutation } = useMutation<OnboardingQuestionOneMutation>({
    mutation: graphql`
      mutation OnboardingQuestionOneMutation($collectorLevel: Int!) {
        updateMyUserProfile(input: { collectorLevel: $collectorLevel }) {
          clientMutationId
        }
      }
    `,
  })

  const tracking = useOnboardingTracking()

  const handleNext = () => {
    const level = COLLECTOR_LEVELS[state.questionOne!]

    try {
      // No need to `await` on response
      submitMutation({ variables: { collectorLevel: level } })
    } catch (error) {
      console.error(error)
      // Ignore error
    }

    tracking.trackQuestionOne(state.questionOne)
    __handleNext__()
  }

  return (
    <SplitLayout
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
            Have you purchased art before?
          </Text>

          <Spacer y={4} />

          <Box ref={register(2)}>
            <Join separator={<Spacer y={2} />}>
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

const COLLECTOR_LEVELS = {
  [OPTION_YES_I_LOVE_COLLECTING_ART]: 3,
  [OPTION_NO_IM_JUST_STARTING_OUT]: 2,
}
