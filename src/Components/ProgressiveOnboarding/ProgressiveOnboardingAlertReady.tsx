import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC, ReactNode } from "react"
import { Text } from "@artsy/palette"
import { PROGRESSIVE_ONBOARDING_ALERTS } from "Components/ProgressiveOnboarding/progressiveOnboardingAlerts"
import { useDismissibleContext } from "@artsy/dismissible"

const ALERT = {
  alertSelectFilter: PROGRESSIVE_ONBOARDING_ALERTS.alertSelectFilter,
  alertCreate: PROGRESSIVE_ONBOARDING_ALERTS.alertCreate,
  alertReady: PROGRESSIVE_ONBOARDING_ALERTS.alertReady,
}

interface ProgressiveOnboardingAlertReadyProps {
  children: (actions: { onSkip(): void }) => ReactNode
}

export const ProgressiveOnboardingAlertReady: FC<ProgressiveOnboardingAlertReadyProps> = ({
  children,
}) => {
  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayable =
    isDismissed(ALERT.alertSelectFilter).status &&
    isDismissed(ALERT.alertCreate).status &&
    !isDismissed(ALERT.alertReady).status

  const handleClose = () => {
    dismiss(ALERT.alertCreate)
    dismiss(ALERT.alertSelectFilter)
    dismiss(ALERT.alertReady)
  }

  if (!isDisplayable) {
    return <>{children({ onSkip: () => {} })}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={ALERT.alertReady}
      placement="bottom"
      onClose={handleClose}
      popover={<Text variant="xs">When you’re ready, click Create Alert.</Text>}
    >
      {children({ onSkip: handleClose })}
    </ProgressiveOnboardingPopover>
  )
}
