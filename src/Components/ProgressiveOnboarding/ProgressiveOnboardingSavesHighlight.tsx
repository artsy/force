import { useProgressiveOnboarding } from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { ProgressiveOnboardingHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingHighlight"
import { PROGRESSIVE_ONBOARDING_SAVE_ARTWORK } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveArtwork"
import { FC, useEffect } from "react"

export const PROGRESSIVE_ONBOARDING_SAVES_HIGHLIGHT = "saves-highlight"

export const ProgressiveOnboardingSavesHighlight: FC = ({ children }) => {
  const { isDismissed, dismiss, enabled } = useProgressiveOnboarding()

  const isDisplayable =
    // If the feature is enabled
    enabled &&
    // And you haven't already dismissed this
    !isDismissed(PROGRESSIVE_ONBOARDING_SAVES_HIGHLIGHT) &&
    // And you've previously dismissed the save artwork onboarding
    isDismissed(PROGRESSIVE_ONBOARDING_SAVE_ARTWORK)

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
