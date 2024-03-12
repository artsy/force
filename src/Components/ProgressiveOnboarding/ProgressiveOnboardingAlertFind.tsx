import { Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import {
  withProgressiveOnboardingCounts,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC } from "react"
import { useDismissibleContext } from "@artsy/dismissible"
import { PROGRESSIVE_ONBOARDING } from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"

const KEY = PROGRESSIVE_ONBOARDING.alertFind

interface ProgressiveOnboardingAlertFindProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingAlertFind__: FC<ProgressiveOnboardingAlertFindProps> = ({
  children,
  counts,
}) => {
  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayable = counts.savedSearches === 1 && !isDismissed(KEY).status

  const handleClose = () => {
    dismiss(KEY)
  }

  const handleDismiss = () => {
    handleClose()
  }

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={KEY}
      placement="bottom-end"
      onClose={handleClose}
      onDismiss={handleDismiss}
      ignoreClickOutside={false}
      zIndex={Z.dropdown}
      popover={<Text variant="xs">Find and edit all your Alerts here.</Text>}
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}

export const ProgressiveOnboardingAlertFind = withProgressiveOnboardingCounts(
  __ProgressiveOnboardingAlertFind__
)
