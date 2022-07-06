import { Spacer, Text, Box, Join, Pill } from "@artsy/palette"
import { FC } from "react"
import { graphql } from "react-relay"
import { useMutation } from "v2/Utils/Hooks/useMutation"
import { OnboardingFigure } from "../Components/OnboardingFigure"
import { OnboardingQuestionPanel } from "../Components/OnboardingQuestionPanel"
import { OnboardingSplitLayout } from "../Components/OnboardingSplitLayout"
import {
  OPTION_NO_IM_JUST_STARTING_OUT,
  OPTION_YES_I_LOVE_COLLECTING_ART,
} from "../config"
import { useOnboardingFadeTransition } from "../Hooks/useOnboardingFadeTransition"
import { useOnboardingContext } from "../useOnboardingContext"
import { OnboardingQuestionOneMutation } from "v2/__generated__/OnboardingQuestionOneMutation.graphql"

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

  const handleNext = () => {
    const level = COLLECTOR_LEVELS[state.questionOne!]

    try {
      // No need to `await` on response
      submitMutation({ variables: { collectorLevel: level } })
    } catch (error) {
      console.error(error)
      // Ignore error
    }

    __handleNext__()
  }

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

const COLLECTOR_LEVELS = {
  [OPTION_YES_I_LOVE_COLLECTING_ART]: 3,
  [OPTION_NO_IM_JUST_STARTING_OUT]: 2,
}
