import { AuthContextModule, AuthIntent } from "@artsy/cohesion"
import { useTitleWithIntent } from "Apps/Authentication/Hooks/useTitleWithIntent"
import { DEFAULT_TITLES } from "Components/AuthDialog/AuthDialog"
import {
  AuthDialogMode,
  DEFAULT_AUTH_MODAL_INTENTS,
  useAuthDialogContext,
} from "Components/AuthDialog/AuthDialogContext"
import { useEffect } from "react"
import { useRouter } from "System/Hooks/useRouter"
import { AfterAuthAction } from "Utils/Hooks/useAuthIntent"

/**
 * Converts query params into auth dialog options and sets them.
 * Returns strings for use on parent page.
 *
 * **Valid query params:**
 * - `title`: Sets the title of the screen
 * - `description`: Sets the description
 * - `intent`: If present for analytics will also set a default title if `title` isn't present
 * - `afterAuthAction`: Sets `options.afterAuthAction`
 * - `redirectTo`: Sets `options.redirectTo`
 * - `contextModule`: Sets `analytics.contextModule`
 *
 * **Deprecated query params:**
 * - `copy`: Sets the title of the screen
 * - `afterSignUpAction`: Sets `options.afterAuthAction`
 * - `submissionId`: If present will construct an `afterAuthAction` from it
 */
export const useAuthDialogOptions = () => {
  const {
    state: { mode },
    dispatch,
  } = useAuthDialogContext()

  const {
    match: {
      location: { query },
    },
  } = useRouter()

  const titleWithIntent = useTitleWithIntent()

  const title =
    query.title || query.copy || titleWithIntent || DEFAULT_TITLES[mode]

  const pageTitle = PAGE_TITLES[mode]

  const description = query.description || DEFAULT_DESCRIPTIONS[mode]

  // FIXME: Convection should link using the `afterAuthAction` param,
  // not `submissionId` so that we don't have to do this.
  //
  // If there's a `submissionId` constructs an `afterAuthAction` from it. Otherwise
  // falls back to the `afterAuthAction` param.
  const afterAuthAction: AfterAuthAction | undefined = !!query.submissionId
    ? {
        action: "associateSubmission",
        kind: "submission",
        objectId: query.submissionId,
      }
    : ((query.afterSignUpAction as unknown) as AfterAuthAction) ||
      ((query.afterAuthAction as unknown) as AfterAuthAction)

  useEffect(() => {
    dispatch({
      type: "SET",
      payload: {
        analytics: {
          intent: (query.intent ||
            // Set a default intent based on the view mode
            DEFAULT_AUTH_MODAL_INTENTS[mode]) as AuthIntent,
          contextModule: query.contextModule as AuthContextModule,
        },
        mode,
        options: {
          title,
          afterAuthAction,
          redirectTo: query.redirectTo,
        },
      },
    })
  }, [
    afterAuthAction,
    dispatch,
    mode,
    query.contextModule,
    query.intent,
    query.redirectTo,
    title,
  ])

  return { title, description, pageTitle }
}

const DEFAULT_DESCRIPTIONS: Record<AuthDialogMode, string | null> = {
  Login: null,
  ForgotPassword: null,
  SignUp:
    "Build your personalized profile. Get art market insights. Buy and sell with confidence.",
}

const PAGE_TITLES: Record<AuthDialogMode, string> = {
  Login: "Log in to Artsy",
  SignUp: "Sign up for Artsy",
  ForgotPassword: "Reset your password", // pragma: allowlist secret
}
