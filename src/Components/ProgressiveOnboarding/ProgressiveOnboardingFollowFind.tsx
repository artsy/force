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

interface ProgressiveOnboardingFollowFindProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingFollowFind__: FC<ProgressiveOnboardingFollowFindProps> = ({
  children,
  counts,
}) => {
  const { dismiss, isDismissed } = useDismissibleContext()

  const isDisplayable =
    counts.followedArtists === 1 &&
    !isDismissed(PROGRESSIVE_ONBOARDING.followFind).status

  const handleClose = () => {
    dismiss(PROGRESSIVE_ONBOARDING.followFind)
  }

  const handleDismiss = () => {
    handleClose()
    dismiss(PROGRESSIVE_ONBOARDING.followHighlight)
  }

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING.followFind}
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
