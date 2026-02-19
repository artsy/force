import { useOnboarding } from "Components/Onboarding"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { omit } from "es-toolkit"
import { useEffect, useRef } from "react"

// TODO: Lazy load
export const useOnboardingModal = () => {
  const { isLoggedIn } = useSystemContext()
  const { match, router } = useRouter()
  const initialized = useRef(false)

  const { onboardingComponent, showOnboarding, hideOnboarding } = useOnboarding(
    {
      onClose: () => {
        hideOnboarding()
      },
    },
  )

  // Check to see if we should open onboarding (logged in + ?onboarding=true),
  // show it, and then immediately remove the query param
  useEffect(() => {
    if (!isLoggedIn || !match.location.query.onboarding || initialized.current)
      return

    showOnboarding()

    router.replace({
      ...match.location,
      query: omit(match.location.query, ["onboarding"]),
    })

    initialized.current = true
  }, [isLoggedIn, match.location, router, showOnboarding])

  return { onboardingComponent }
}
