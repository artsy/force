import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC, ReactNode } from "react"
import { Text } from "@artsy/palette"
import { PROGRESSIVE_ONBOARDING } from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"
import { useDismissibleContext } from "@artsy/dismissible"

interface ProgressiveOnboardingAlertReadyProps {
  children: (actions: { onSkip(): void }) => ReactNode
}

export const ProgressiveOnboardingAlertReady: FC<ProgressiveOnboardingAlertReadyProps> = ({
  children,
}) => {
  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayable =
    isDismissed(PROGRESSIVE_ONBOARDING.alertSelectFilter).status &&
    isDismissed(PROGRESSIVE_ONBOARDING.alertCreate).status &&
    !isDismissed(PROGRESSIVE_ONBOARDING.alertReady).status

  const handleClose = () => {
    dismiss(PROGRESSIVE_ONBOARDING.alertCreate)
    dismiss(PROGRESSIVE_ONBOARDING.alertSelectFilter)
    dismiss(PROGRESSIVE_ONBOARDING.alertReady)
  }

  if (!isDisplayable) {
    return <>{children({ onSkip: () => {} })}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING.alertReady}
      placement="bottom"
      onClose={handleClose}
      popover={<Text variant="xs">When you’re ready, click Create Alert.</Text>}
    >
      {children({ onSkip: handleClose })}
    </ProgressiveOnboardingPopover>
  )
}
