import { Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import {
  PROGRESSIVE_ONBOARDING_ALERT_FIND,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import {
  ProgressiveOnboardingCountsQueryRenderer,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingCounts"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC } from "react"

interface ProgressiveOnboardingAlertFindProps
  extends WithProgressiveOnboardingCountsProps {}

const ProgressiveOnboardingAlertFind: FC<ProgressiveOnboardingAlertFindProps> = ({
  children,
  counts,
}) => {
  const { dismiss, isDismissed } = useProgressiveOnboarding()

  const isDisplayable =
    counts.savedSearches === 1 &&
    !isDismissed(PROGRESSIVE_ONBOARDING_ALERT_FIND).status

  const handleClose = () => {
    dismiss(PROGRESSIVE_ONBOARDING_ALERT_FIND)
  }

  const handleDismiss = () => {
    handleClose()
  }

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING_ALERT_FIND}
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

export const ProgressiveOnboardingAlertFindQueryRenderer: FC = ({
  children,
}) => {
  return (
    <ProgressiveOnboardingCountsQueryRenderer
      Component={ProgressiveOnboardingAlertFind}
    >
      {children}
    </ProgressiveOnboardingCountsQueryRenderer>
  )
}
