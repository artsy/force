import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { useAfterAuthenticationRedirect } from "Components/AuthDialog/Hooks/useAfterAuthenticationRedirect"
import { getTrustToken } from "Utils/auth"
import { setAfterAuthAction } from "Utils/Hooks/useAuthIntent"

/**
 * Runs anything that needs to happen after Login or SignUp
 */
export const useAfterAuthentication = () => {
  const {
    state: { mode, options },
  } = useAuthDialogContext()

  const { runRedirect } = useAfterAuthenticationRedirect()

  const runAfterAuthentication = async ({
    accessToken,
  }: {
    accessToken?: string
  } = {}) => {
    if (mode === "ForgotPassword") return // Do nothing

    if (options.afterAuthAction) {
      setAfterAuthAction(options.afterAuthAction)
    }

    // trustToken is used to login to Gravity
    let trustToken: string | null = null

    try {
      trustToken = accessToken ? await getTrustToken(accessToken) : null
    } catch (err) {
      console.error(err)
    }

    runRedirect(trustToken)
  }

  return { runAfterAuthentication }
}
