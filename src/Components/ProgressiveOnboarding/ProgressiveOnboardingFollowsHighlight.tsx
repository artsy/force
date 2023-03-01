import { useProgressiveOnboarding } from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowArtist"
import { ProgressiveOnboardingHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingHighlight"
import { FC, useEffect } from "react"

export const PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT = "follows-highlight"

export const ProgressiveOnboardingFollowsHighlight: FC = ({ children }) => {
  const { isDismissed, dismiss, enabled } = useProgressiveOnboarding()

  const isDisplayable =
    // If the feature is enabled
    enabled &&
    // And you haven't already dismissed this
    !isDismissed(PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT) &&
    // And you've previously dismissed the follow artist onboarding
    isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST)

  useEffect(() => {
    if (!isDisplayable) return

    const handleClick = () => {
      dismiss(PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT)
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
      name={PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT}
    >
      {children}
    </ProgressiveOnboardingHighlight>
  )
}
