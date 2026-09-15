import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { isCommercialAuthIntent } from "Components/AuthDialog/Utils/isCommercialAuthIntent"
import { useMemo } from "react"

export const useElligibleForOnboarding = () => {
  const {
    state: { mode, analytics },
  } = useAuthDialogContext()

  const isElligibleForOnboarding = useMemo(() => {
    return (
      // Only trigger onboarding for sign ups...
      mode === "SignUp" &&
      // ...without a commercial intent
      !isCommercialAuthIntent(analytics.intent)
    )
  }, [analytics.intent, mode])

  return { isElligibleForOnboarding }
}
