import { Z } from "Apps/Components/constants"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { PROGRESSIVE_ONBOARDING } from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"
import {
  type WithProgressiveOnboardingCountsProps,
  withProgressiveOnboardingCounts,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { useDismissibleContext } from "@artsy/dismissible"
import { Text } from "@artsy/palette"
import type { FC } from "react"

const KEY = PROGRESSIVE_ONBOARDING.alertFind

interface ProgressiveOnboardingAlertFindProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingAlertFind__: FC<
  React.PropsWithChildren<ProgressiveOnboardingAlertFindProps>
> = ({ children, counts }) => {
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
  __ProgressiveOnboardingAlertFind__,
)
