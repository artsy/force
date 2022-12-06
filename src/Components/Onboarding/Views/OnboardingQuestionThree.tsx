import { Spacer, Text, Join, Box, Pill } from "@artsy/palette"
import { FC, useMemo } from "react"
import { OnboardingFigure } from "../Components/OnboardingFigure"
import { OnboardingQuestionPanel } from "../Components/OnboardingQuestionPanel"
import {
  OPTION_ARTISTS_ON_THE_RISE,
  OPTION_A_CURATED_SELECTION_OF_ARTWORKS,
  OPTION_COLLECTING_ART_THAT_MOVES_ME,
  OPTION_DEVELOPING_MY_ART_TASTES,
  OPTION_FINDING_GREAT_INVESTMENTS,
  OPTION_FOLLOW_ARTISTS_IM_INTERESTED_IN,
  OPTION_FOLLOW_GALLERIES_I_LOVE,
  OPTION_KEEP_TRACK_OF_ART,
  OPTION_TOP_AUCTION_LOTS,
} from "../config"
import { useOnboardingFadeTransition } from "../Hooks/useOnboardingFadeTransition"
import { useOnboardingContext } from "../Hooks/useOnboardingContext"
import { useOnboardingTracking } from "../Hooks/useOnboardingTracking"
import { SplitLayout } from "Components/SplitLayout"

export const OnboardingQuestionThree: FC = () => {
  const { state, dispatch, next } = useOnboardingContext()
  const { register, loading, handleNext } = useOnboardingFadeTransition({
    next,
  })

  const tracking = useOnboardingTracking()

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
      case state.questionTwo[0] === OPTION_COLLECTING_ART_THAT_MOVES_ME:
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
    <SplitLayout
      left={
        <OnboardingFigure
          ref={register(0)}
          src="https://files.artsy.net/images/question-three-img.jpg"
          aspectWidth={1600}
          aspectHeight={2764}
          caption="Super Future Kid, Hazy Daisy, 2021"
        />
      }
      right={
        <OnboardingQuestionPanel
          disabled={state.questionThree === null || loading}
          loading={loading}
          onNext={() => {
            tracking.trackQuestionThree(state.questionThree)
            handleNext()
          }}
        >
          <Text variant="lg-display" ref={register(1)}>
            Almost done! What would you like to see first?
          </Text>

          <Spacer y={1} />

          <Text variant="sm-display" ref={register(2)}>
            Choose one to start exploring.
          </Text>

          <Box ref={register(3)} mt={4}>
            <Join separator={<Spacer y={2} />}>
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
        </OnboardingQuestionPanel>
      }
    />
  )
}
