import {
  ProgressiveOnboardingHighlight,
  type ProgressiveOnboardingHighlightPosition,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingHighlight"
import { PROGRESSIVE_ONBOARDING } from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"
import { useDismissibleContext } from "@artsy/dismissible"
import { type FC, useEffect } from "react"

interface ProgressiveOnboardingFollowHighlightProps {
  position: ProgressiveOnboardingHighlightPosition
}

export const ProgressiveOnboardingFollowHighlight: FC<
  React.PropsWithChildren<ProgressiveOnboardingFollowHighlightProps>
> = ({ children, position }) => {
  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayable =
    // You haven't already dismissed this
    !isDismissed(PROGRESSIVE_ONBOARDING.followHighlight).status &&
    // And you've previously dismissed the previous onboarding tip
    isDismissed(PROGRESSIVE_ONBOARDING.followFind).status &&
    // And you've dismissed the previous step within the last 20 seconds
    isDismissed(PROGRESSIVE_ONBOARDING.followFind).timestamp >
      Date.now() - 20 * 1000

  useEffect(() => {
    if (!isDisplayable) return

    const handleClick = () => {
      dismiss(PROGRESSIVE_ONBOARDING.followHighlight)
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
      name={PROGRESSIVE_ONBOARDING.followHighlight}
      position={position}
    >
      {children}
    </ProgressiveOnboardingHighlight>
  )
}
