import { useDismissibleContext } from "@artsy/dismissible"
import {
  ProgressiveOnboardingHighlight,
  ProgressiveOnboardingHighlightPosition,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingHighlight"
import { PROGRESSIVE_ONBOARDING } from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"
import { FC, useEffect } from "react"

const ALERTS = {
  saveFind: PROGRESSIVE_ONBOARDING.saveFind,
  saveHighlight: PROGRESSIVE_ONBOARDING.saveHighlight,
}

interface ProgressiveOnboardingSaveHighlightProps {
  position: ProgressiveOnboardingHighlightPosition
}

export const ProgressiveOnboardingSaveHighlight: FC<ProgressiveOnboardingSaveHighlightProps> = ({
  children,
  position,
}) => {
  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayable =
    // You haven't already dismissed this
    !isDismissed(ALERTS.saveHighlight).status &&
    // And you've previously dismissed the previous onboarding tip
    isDismissed(ALERTS.saveFind).status &&
    // And you've dismissed the previous step within the last 20 seconds
    isDismissed(ALERTS.saveFind).timestamp > Date.now() - 20 * 1000

  useEffect(() => {
    if (!isDisplayable) return

    const handleClick = () => {
      dismiss(ALERTS.saveHighlight)
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
      name={ALERTS.saveHighlight}
    >
      {children}
    </ProgressiveOnboardingHighlight>
  )
}
