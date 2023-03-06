import {
  PROGRESSIVE_ONBOARDING_SAVES_HIGHLIGHT,
  PROGRESSIVE_ONBOARDING_FIND_SAVES,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { ProgressiveOnboardingHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingHighlight"
import { FC, useEffect } from "react"

export const ProgressiveOnboardingSavesHighlight: FC = ({ children }) => {
  const { isDismissed, dismiss, enabled } = useProgressiveOnboarding()

  const isDisplayable =
    // If the feature is enabled
    enabled &&
    // And you haven't already dismissed this
    !isDismissed(PROGRESSIVE_ONBOARDING_SAVES_HIGHLIGHT) &&
    // And you've previously dismissed the previous onboarding tip
    isDismissed(PROGRESSIVE_ONBOARDING_FIND_SAVES)

  useEffect(() => {
    if (!isDisplayable) return

    const handleClick = () => {
      dismiss(PROGRESSIVE_ONBOARDING_SAVES_HIGHLIGHT)
    }

    document.addEventListener("click", handleClick, { once: true })

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [dismiss, isDisplayable])

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingHighlight
      name={PROGRESSIVE_ONBOARDING_SAVES_HIGHLIGHT}
    >
      {children}
    </ProgressiveOnboardingHighlight>
  )
}
