import { useTracking } from "react-tracking"
import {
  ActionType,
  ContextModule,
  StartedOnboarding,
  CompletedOnboarding,
  OnboardingUserInputData,
} from "@artsy/cohesion"
import { useCallback } from "react"

export const useOnboardingTracking = () => {
  const { trackEvent } = useTracking()

  const userStartedOnboarding = useCallback(() => {
    const payload: StartedOnboarding = {
      action: ActionType.startedOnboarding,
    }

    trackEvent(payload)
  }, [trackEvent])

  const trackQuestionOne = useCallback(
    response => {
      const payload: OnboardingUserInputData = {
        action: ActionType.onboardingUserInputData,
        context_module: ContextModule.onboardingCollectorLevel,
        data_input: response,
      }

      trackEvent(payload)
    },
    [trackEvent]
  )

  const trackQuestionTwo = useCallback(
    response => {
      const payload: OnboardingUserInputData = {
        action: ActionType.onboardingUserInputData,
        context_module: ContextModule.onboardingInterests,
        data_input: response,
      }

      trackEvent(payload)
    },
    [trackEvent]
  )

  const trackQuestionThree = useCallback(
    response => {
      const payload: OnboardingUserInputData = {
        action: ActionType.onboardingUserInputData,
        context_module: ContextModule.onboardingActivity,
        data_input: response,
      }

      trackEvent(payload)
    },
    [trackEvent]
  )

  const userCompletedOnboarding = useCallback(() => {
    const payload: CompletedOnboarding = {
      action: ActionType.completedOnboarding,
    }

    trackEvent(payload)
  }, [trackEvent])

  return {
    userStartedOnboarding,
    trackQuestionOne,
    trackQuestionTwo,
    trackQuestionThree,
    userCompletedOnboarding,
  }
}
