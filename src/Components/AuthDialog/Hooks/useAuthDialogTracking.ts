import {
  ActionType,
  AuthImpression,
  AuthModalType,
  CreatedAccount,
  Intent,
  ResetYourPassword,
  SuccessfullyLoggedIn,
} from "@artsy/cohesion"
import {
  AUTH_MODAL_TYPES,
  useAuthDialogContext,
} from "Components/AuthDialog/AuthDialogContext"
import { useAfterAuthenticationRedirectUrl } from "Components/AuthDialog/Hooks/useAfterAuthenticationRedirectUrl"
import { useElligibleForOnboarding } from "Components/AuthDialog/Hooks/useElligibleForOnboarding"
import { useTracking } from "react-tracking"

export const useAuthDialogTracking = () => {
  const {
    state: { mode, analytics },
  } = useAuthDialogContext()

  const { trackEvent } = useTracking()
  const { isElligibleForOnboarding } = useElligibleForOnboarding()
  const { redirectUrl } = useAfterAuthenticationRedirectUrl()

  return {
    impression: ({ title }: { title: string }) => {
      if (!analytics.intent || !analytics.trigger) return

      const payload: AuthImpression = {
        action: ActionType.authImpression,
        context_module: analytics.contextModule,
        intent: analytics.intent,
        modal_copy: title,
        onboarding: isElligibleForOnboarding,
        trigger: analytics.trigger,
        type: AUTH_MODAL_TYPES[mode],
      }

      trackEvent(payload)
    },

    loggedIn: ({
      contextModule = analytics.contextModule,
      service = "email",
      userId,
      intent = analytics.intent || Intent.login,
      trigger = analytics.trigger || "click",
    }: {
      contextModule?: SuccessfullyLoggedIn["context_module"]
      service: SuccessfullyLoggedIn["service"]
      userId: SuccessfullyLoggedIn["user_id"]
      intent?: SuccessfullyLoggedIn["intent"]
      trigger?: SuccessfullyLoggedIn["trigger"]
    }) => {
      const payload: SuccessfullyLoggedIn = {
        action: ActionType.successfullyLoggedIn,
        auth_redirect: redirectUrl,
        context_module: contextModule,
        intent,
        service,
        trigger,
        type: AuthModalType.login,
        user_id: userId,
      }

      return trackEvent(payload)
    },

    signedUp: ({
      contextModule = analytics.contextModule,
      service = "email",
      userId,
      intent = analytics.intent || Intent.signup,
      trigger = analytics.trigger || "click",
    }: {
      contextModule?: CreatedAccount["context_module"]
      service: CreatedAccount["service"]
      userId: CreatedAccount["user_id"]
      intent?: CreatedAccount["intent"]
      trigger?: CreatedAccount["trigger"]
    }) => {
      const payload: CreatedAccount = {
        action: ActionType.createdAccount,
        auth_redirect: redirectUrl,
        context_module: contextModule,
        intent,
        onboarding: isElligibleForOnboarding,
        service,
        trigger,
        type: AuthModalType.signup,
        user_id: userId,
      }

      return trackEvent(payload)
    },

    resetPassword: () => {
      if (!analytics.intent || !analytics.trigger) return

      const payload: ResetYourPassword = {
        action: ActionType.resetYourPassword,
        auth_redirect: redirectUrl,
        context_module: analytics.contextModule,
        intent: analytics.intent,
        service: "email",
        trigger: analytics.trigger,
        type: AuthModalType.forgot,
      }

      return trackEvent(payload)
    },
  }
}
