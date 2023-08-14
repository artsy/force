import {
  PROGRESSIVE_ONBOARDING_ALERT_CREATE,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC } from "react"
import { Text } from "@artsy/palette"
import {
  WithProgressiveOnboardingCountsProps,
  withProgressiveOnboardingCounts,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { useSystemContext } from "System/SystemContext"

interface ProgressiveOnboardingAlertCreateSimpleProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingAlertCreateSimple__: FC<ProgressiveOnboardingAlertCreateSimpleProps> = ({
  children,
  counts,
}) => {
  const { isLoggedIn } = useSystemContext()

  const { dismiss, isDismissed } = useProgressiveOnboarding()

  const isDisplayable =
    isLoggedIn &&
    !isDismissed(PROGRESSIVE_ONBOARDING_ALERT_CREATE).status &&
    counts.isReady &&
    counts.savedSearches === 0

  const handleClose = () => {
    dismiss(PROGRESSIVE_ONBOARDING_ALERT_CREATE)
  }

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING_ALERT_CREATE}
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
