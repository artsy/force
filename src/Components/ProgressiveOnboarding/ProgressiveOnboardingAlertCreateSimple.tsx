import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC } from "react"
import { Text } from "@artsy/palette"
import {
  WithProgressiveOnboardingCountsProps,
  withProgressiveOnboardingCounts,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { useSystemContext } from "System/SystemContext"
import { useDismissibleContext } from "@artsy/dismissible"
import { PROGRESSIVE_ONBOARDING_ALERTS } from "Components/ProgressiveOnboarding/progressiveOnboardingAlerts"

const ALERT_ID = PROGRESSIVE_ONBOARDING_ALERTS.alertCreate

interface ProgressiveOnboardingAlertCreateSimpleProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingAlertCreateSimple__: FC<ProgressiveOnboardingAlertCreateSimpleProps> = ({
  children,
  counts,
}) => {
  const { isLoggedIn } = useSystemContext()

  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayable =
    isLoggedIn &&
    !isDismissed(ALERT_ID).status &&
    counts.isReady &&
    counts.savedSearches === 0

  const handleClose = () => {
    dismiss(ALERT_ID)
  }

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={ALERT_ID}
      ignoreClickOutside
      placement="left"
      onClose={handleClose}
      popover={
        <Text variant="xs">
          Create an alert for similar works by this artist.
        </Text>
      }
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}

export const ProgressiveOnboardingAlertCreateSimple = withProgressiveOnboardingCounts(
  __ProgressiveOnboardingAlertCreateSimple__
)
