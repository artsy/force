import { Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import {
  withProgressiveOnboardingCounts,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC } from "react"
import { useDismissibleContext } from "@artsy/dismissible"
import { PROGRESSIVE_ONBOARDING_ALERTS } from "Components/ProgressiveOnboarding/progressiveOnboardingAlerts"

interface ProgressiveOnboardingFollowFindProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingFollowFind__: FC<ProgressiveOnboardingFollowFindProps> = ({
  children,
  counts,
}) => {
  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayable =
    counts.followedArtists === 1 &&
    !isDismissed(PROGRESSIVE_ONBOARDING_ALERTS.followFind).status

  const handleClose = () => {
    dismiss(PROGRESSIVE_ONBOARDING_ALERTS.followFind)
  }

  const handleDismiss = () => {
    handleClose()
    dismiss(PROGRESSIVE_ONBOARDING_ALERTS.followHighlight)
  }

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING_ALERTS.followFind}
      placement="bottom-end"
      onClose={handleClose}
      onDismiss={handleDismiss}
      ignoreClickOutside={false}
      zIndex={Z.dropdown}
      popover={<Text variant="xs">Find and edit all your Follows here.</Text>}
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}

export const ProgressiveOnboardingFollowFind = withProgressiveOnboardingCounts(
  __ProgressiveOnboardingFollowFind__
)
