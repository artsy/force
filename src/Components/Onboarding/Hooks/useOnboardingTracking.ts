import {
  ActionType,
  type CompletedOnboarding,
  ContextModule,
  type OnboardingUserInputData,
  type StartedOnboarding,
  type SubscribedToEmail,
} from "@artsy/cohesion"
import { setBrazeCustomAttributes } from "Server/analytics/setBrazeCustomAttributes"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useCallback } from "react"
import { useTracking } from "react-tracking"

export const useOnboardingTracking = () => {
  const { trackEvent } = useTracking()
  const { user } = useSystemContext()

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
    [trackEvent],
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
    [trackEvent],
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
    [trackEvent],
  )

  const trackInterests = useCallback(
    (interests: string[]) => {
      const payload: OnboardingUserInputData = {
        action: ActionType.onboardingUserInputData,
        context_module: ContextModule.onboardingInterests,
        data_input: JSON.stringify(interests),
      }

      trackEvent(payload)
    },
    [trackEvent],
  )

  const trackSource = useCallback(
    (source: string) => {
      const payload: OnboardingUserInputData = {
        action: ActionType.onboardingUserInputData,
        context_module: ContextModule.onboardingAttribution,
        data_input: source,
      }

      trackEvent(payload)
    },
    [trackEvent],
  )

  const trackSubscribedToEmail = useCallback(() => {
    const payload: SubscribedToEmail = {
      action: ActionType.subscribedToEmail,
    }

    trackEvent(payload)
  }, [trackEvent])

  const userCompletedOnboarding = useCallback(() => {
    const payload: CompletedOnboarding = {
      action: ActionType.completedOnboarding,
    }

    trackEvent(payload)
  }, [trackEvent])

  const setBrazeOnboardingAttributes = useCallback(
    ({ interests, source }: { interests: string[]; source: string }) => {
      if (!user?.id) {
        return
      }

      setBrazeCustomAttributes({
        onboarding_interests: interests,
        onboarding_source: source,
      })
    },
    [user],
  )

  return {
    userStartedOnboarding,
    trackQuestionOne,
    trackQuestionTwo,
    trackQuestionThree,
    trackInterests,
    trackSource,
    trackSubscribedToEmail,
    userCompletedOnboarding,
    setBrazeOnboardingAttributes,
  }
}
