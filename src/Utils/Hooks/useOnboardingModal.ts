import { omit } from "lodash"
import { useEffect } from "react"
import { useOnboarding } from "Components/Onboarding"
import { useSystemContext } from "System"
import { useRouter } from "System/Router/useRouter"
import { stringify } from "qs"

export const useOnboardingModal = () => {
  const { isLoggedIn } = useSystemContext()
  const { match } = useRouter()

  const { onboardingComponent, showOnboarding, hideOnboarding } = useOnboarding(
    {
      onClose: () => {
        hideOnboarding()
      },
    }
  )

  // Check to see if we should open onboarding (logged in + ?onboarding=true),
  // show it, and then immediately remove the query param
  useEffect(() => {
    if (!isLoggedIn || !match.location.query.onboarding) return

    showOnboarding()

    // Manually manipulate URL to avoid triggering analytics with router.replace
    const search = stringify(omit(match.location.query, "onboarding"))

    window.history.replaceState(
      null,
      "",
      match.location.pathname + (search !== "" ? `?${search}` : "")
    )
  }, [isLoggedIn, match.location, showOnboarding])

  return { onboardingComponent }
}
