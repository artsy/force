import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC, ReactNode } from "react"
import { Text } from "@artsy/palette"
import { PROGRESSIVE_ONBOARDING_ALERTS } from "Components/ProgressiveOnboarding/progressiveOnboardingAlerts"
import { useDismissibleContext } from "@artsy/dismissible"

interface ProgressiveOnboardingAlertReadyProps {
  children: (actions: { onSkip(): void }) => ReactNode
}

export const ProgressiveOnboardingAlertReady: FC<ProgressiveOnboardingAlertReadyProps> = ({
  children,
}) => {
  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayable =
    isDismissed(PROGRESSIVE_ONBOARDING_ALERTS.alertSelectFilter).status &&
    isDismissed(PROGRESSIVE_ONBOARDING_ALERTS.alertCreate).status &&
    !isDismissed(PROGRESSIVE_ONBOARDING_ALERTS.alertReady).status

  const handleClose = () => {
    dismiss(PROGRESSIVE_ONBOARDING_ALERTS.alertCreate)
    dismiss(PROGRESSIVE_ONBOARDING_ALERTS.alertSelectFilter)
    dismiss(PROGRESSIVE_ONBOARDING_ALERTS.alertReady)
  }

  if (!isDisplayable) {
    return <>{children({ onSkip: () => {} })}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING_ALERTS.alertReady}
      placement="bottom"
      onClose={handleClose}
      popover={<Text variant="xs">When you’re ready, click Create Alert.</Text>}
    >
      {children({ onSkip: handleClose })}
    </ProgressiveOnboardingPopover>
  )
}
