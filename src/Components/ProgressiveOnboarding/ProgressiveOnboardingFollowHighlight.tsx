import { useDismissibleContext } from "@artsy/dismissible"
import {
  ProgressiveOnboardingHighlight,
  ProgressiveOnboardingHighlightPosition,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingHighlight"
import { PROGRESSIVE_ONBOARDING_ALERTS } from "Components/ProgressiveOnboarding/progressiveOnboardingAlerts"
import { FC, useEffect } from "react"

interface ProgressiveOnboardingFollowHighlightProps {
  position: ProgressiveOnboardingHighlightPosition
}

export const ProgressiveOnboardingFollowHighlight: FC<ProgressiveOnboardingFollowHighlightProps> = ({
  children,
  position,
}) => {
  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayable =
    // You haven't already dismissed this
    !isDismissed(PROGRESSIVE_ONBOARDING_ALERTS.followHighlight).status &&
    // And you've previously dismissed the previous onboarding tip
    isDismissed(PROGRESSIVE_ONBOARDING_ALERTS.followFind).status &&
    // And you've dismissed the previous step within the last 20 seconds
    isDismissed(PROGRESSIVE_ONBOARDING_ALERTS.followFind).timestamp >
      Date.now() - 20 * 1000

  useEffect(() => {
    if (!isDisplayable) return

    const handleClick = () => {
      dismiss(PROGRESSIVE_ONBOARDING_ALERTS.followHighlight)
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
      name={PROGRESSIVE_ONBOARDING_ALERTS.followHighlight}
      position={position}
    >
      {children}
    </ProgressiveOnboardingHighlight>
  )
}
