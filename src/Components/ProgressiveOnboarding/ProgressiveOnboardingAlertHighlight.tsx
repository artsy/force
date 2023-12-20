import { useDismissibleContext } from "@artsy/dismissible"
import {
  ProgressiveOnboardingHighlight,
  ProgressiveOnboardingHighlightPosition,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingHighlight"
import { PROGRESSIVE_ONBOARDING_ALERTS } from "Components/ProgressiveOnboarding/progressiveOnboardingAlerts"
import { FC, useEffect } from "react"

const ALERT = {
  alertHighlight: PROGRESSIVE_ONBOARDING_ALERTS.alertHighlight,
  alertFind: PROGRESSIVE_ONBOARDING_ALERTS.alertFind,
}

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
    !isDismissed(ALERT.alertHighlight).status &&
    // And you've previously dismissed the previous onboarding tip
    isDismissed(ALERT.alertFind).status &&
    // And you've dismissed the previous step within the last 20 seconds
    isDismissed(ALERT.alertFind).timestamp > Date.now() - 20 * 1000

  useEffect(() => {
    if (!isDisplayable) return

    const handleClick = () => {
      dismiss(ALERT.alertHighlight)
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
      name={ALERT.alertHighlight}
    >
      {children}
    </ProgressiveOnboardingHighlight>
  )
}
