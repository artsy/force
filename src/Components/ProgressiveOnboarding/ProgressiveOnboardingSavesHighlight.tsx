import { useProgressiveOnboarding } from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { ProgressiveOnboardingHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingHighlight"
import { PROGRESSIVE_ONBOARDING_SAVE_ARTWORK } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveArtwork"
import { FC, useEffect } from "react"

export const PROGRESSIVE_ONBOARDING_SAVES_HIGHLIGHT = "saves-highlight"

export const ProgressiveOnboardingSavesHighlight: FC = ({ children }) => {
  const { isDismissed, dismiss, enabled } = useProgressiveOnboarding()

  useEffect(() => {
    if (!enabled) return
    if (isDismissed(PROGRESSIVE_ONBOARDING_SAVES_HIGHLIGHT)) return

    const handleClick = () => {
      dismiss(PROGRESSIVE_ONBOARDING_SAVES_HIGHLIGHT)
    }

    document.addEventListener("click", handleClick, { once: true })

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [dismiss, enabled, isDismissed])

  if (
    !enabled ||
    // If you've already dismissed this
    isDismissed(PROGRESSIVE_ONBOARDING_SAVES_HIGHLIGHT) ||
    // Or you haven't yet dismissed the save artwork step
    !isDismissed(PROGRESSIVE_ONBOARDING_SAVE_ARTWORK)
  ) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingHighlight>{children}</ProgressiveOnboardingHighlight>
  )
}
