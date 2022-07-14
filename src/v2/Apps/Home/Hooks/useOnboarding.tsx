import { omit } from "lodash"
import { useEffect } from "react"
import { useOnboarding as _useOnboarding } from "v2/Components/Onboarding"
import { useSystemContext } from "v2/System"
import { useRouter } from "v2/System/Router/useRouter"

export const useOnboarding = () => {
  const { isLoggedIn } = useSystemContext()
  const { match, router } = useRouter()

  const {
    onboardingComponent,
    showOnboarding,
    hideOnboarding,
  } = _useOnboarding({
    onDone: () => {
      hideOnboarding()
    },
  })

  // Check to see if we should open onboarding (logged in + ?onboarding=true),
  // show it, and then immediately remove the query param
  useEffect(() => {
    if (!isLoggedIn || !match.location.query.onboarding) return

    showOnboarding()

    router.replace({
      ...match.location,
      query: omit(match.location.query, "onboarding"),
    })
  }, [isLoggedIn, match.location, router, showOnboarding])

  return { onboardingComponent }
}
