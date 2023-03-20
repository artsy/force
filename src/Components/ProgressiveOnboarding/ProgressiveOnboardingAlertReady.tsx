import {
  PROGRESSIVE_ONBOARDING_ALERT_CREATE,
  PROGRESSIVE_ONBOARDING_ALERT_READY,
  PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC, ReactNode } from "react"
import { Text } from "@artsy/palette"

interface ProgressiveOnboardingAlertReadyProps {
  children: (actions: { onNext(): void }) => ReactNode
}

export const ProgressiveOnboardingAlertReady: FC<ProgressiveOnboardingAlertReadyProps> = ({
  children,
}) => {
  const { dismiss, isDismissed, enabled } = useProgressiveOnboarding()

  const isDisplayable =
    enabled &&
    isDismissed(PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER) &&
    isDismissed(PROGRESSIVE_ONBOARDING_ALERT_CREATE) &&
    !isDismissed(PROGRESSIVE_ONBOARDING_ALERT_READY)

  const handleClose = () => {
    dismiss(PROGRESSIVE_ONBOARDING_ALERT_READY)
  }

  if (!isDisplayable) {
    return <>{children({ onNext: () => {} })}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING_ALERT_READY}
      placement="bottom"
      onClose={handleClose}
      popover={<Text variant="xs">When you’re ready, click Create Alert.</Text>}
    >
      {children({ onNext: handleClose })}
    </ProgressiveOnboardingPopover>
  )
}
