import {
  PROGRESSIVE_ONBOARDING_FOLLOW_HIGHLIGHT,
  PROGRESSIVE_ONBOARDING_FOLLOW_FIND,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import {
  ProgressiveOnboardingHighlight,
  ProgressiveOnboardingHighlightPosition,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingHighlight"
import { FC, useEffect } from "react"

interface ProgressiveOnboardingFollowHighlightProps {
  position: ProgressiveOnboardingHighlightPosition
}

export const ProgressiveOnboardingFollowHighlight: FC<ProgressiveOnboardingFollowHighlightProps> = ({
  children,
  position,
}) => {
  const { isDismissed, dismiss, isEnabledFor } = useProgressiveOnboarding()

  const isDisplayable =
    // If the feature is enabled
    isEnabledFor("follows") &&
    // And you haven't already dismissed this
    !isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_HIGHLIGHT).status &&
    // And you've previously dismissed the previous onboarding tip
    isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_FIND).status &&
    // And you've dismissed the previous step within the last 20 seconds
    isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_FIND).timestamp >
      Date.now() - 20 * 1000

  useEffect(() => {
    if (!isDisplayable) return

    const handleClick = () => {
      dismiss(PROGRESSIVE_ONBOARDING_FOLLOW_HIGHLIGHT)
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
      name={PROGRESSIVE_ONBOARDING_FOLLOW_HIGHLIGHT}
    >
      {children}
    </ProgressiveOnboardingHighlight>
  )
}
