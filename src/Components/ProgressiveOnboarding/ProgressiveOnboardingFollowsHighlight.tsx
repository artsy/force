import {
  PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT,
  PROGRESSIVE_ONBOARDING_FIND_FOLLOWS,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import {
  ProgressiveOnboardingHighlight,
  ProgressiveOnboardingHighlightPosition,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingHighlight"
import { FC, useEffect } from "react"

interface ProgressiveOnboardingFollowsHighlightProps {
  position: ProgressiveOnboardingHighlightPosition
}

export const ProgressiveOnboardingFollowsHighlight: FC<ProgressiveOnboardingFollowsHighlightProps> = ({
  children,
  position,
}) => {
  const { isDismissed, dismiss, enabled } = useProgressiveOnboarding()

  const isDisplayable =
    // If the feature is enabled
    enabled &&
    // And you haven't already dismissed this
    !isDismissed(PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT) &&
    // And you've previously dismissed the previous onboarding tip
    isDismissed(PROGRESSIVE_ONBOARDING_FIND_FOLLOWS)

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
      position={position}
      name={PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT}
    >
      {children}
    </ProgressiveOnboardingHighlight>
  )
}
