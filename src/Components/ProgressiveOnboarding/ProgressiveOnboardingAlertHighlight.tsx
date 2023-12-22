import { useDismissibleContext } from "@artsy/dismissible"
import {
  ProgressiveOnboardingHighlight,
  ProgressiveOnboardingHighlightPosition,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingHighlight"
import { PROGRESSIVE_ONBOARDING_ALERTS } from "Components/ProgressiveOnboarding/progressiveOnboardingAlerts"
import { FC, useEffect } from "react"

interface ProgressiveOnboardingAlertHighlightProps {
  position: ProgressiveOnboardingHighlightPosition
}

export const ProgressiveOnboardingAlertHighlight: FC<ProgressiveOnboardingAlertHighlightProps> = ({
  children,
  position,
}) => {
  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayable =
    // You haven't already dismissed this
    !isDismissed(PROGRESSIVE_ONBOARDING_ALERTS.alertHighlight).status &&
    // And you've previously dismissed the previous onboarding tip
    isDismissed(PROGRESSIVE_ONBOARDING_ALERTS.alertFind).status &&
    // And you've dismissed the previous step within the last 20 seconds
    isDismissed(PROGRESSIVE_ONBOARDING_ALERTS.alertFind).timestamp >
      Date.now() - 20 * 1000

  useEffect(() => {
    if (!isDisplayable) return

    const handleClick = () => {
      dismiss(PROGRESSIVE_ONBOARDING_ALERTS.alertHighlight)
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
      name={PROGRESSIVE_ONBOARDING_ALERTS.alertHighlight}
    >
      {children}
    </ProgressiveOnboardingHighlight>
  )
}
