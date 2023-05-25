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
  children: (actions: { onSkip(): void }) => ReactNode
}

export const ProgressiveOnboardingAlertReady: FC<ProgressiveOnboardingAlertReadyProps> = ({
  children,
}) => {
  const { dismiss, isDismissed } = useProgressiveOnboarding()

  const isDisplayable =
    isDismissed(PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER).status &&
    isDismissed(PROGRESSIVE_ONBOARDING_ALERT_CREATE).status &&
    !isDismissed(PROGRESSIVE_ONBOARDING_ALERT_READY).status

  const handleClose = () => {
    dismiss(PROGRESSIVE_ONBOARDING_ALERT_CREATE)
    dismiss(PROGRESSIVE_ONBOARDING_ALERT_SELECT_FILTER)
    dismiss(PROGRESSIVE_ONBOARDING_ALERT_READY)
  }

  if (!isDisplayable) {
    return <>{children({ onSkip: () => {} })}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING_ALERT_READY}
      placement="bottom"
      onClose={handleClose}
      popover={<Text variant="xs">When you’re ready, click Create Alert.</Text>}
    >
      {children({ onSkip: handleClose })}
    </ProgressiveOnboardingPopover>
  )
}
