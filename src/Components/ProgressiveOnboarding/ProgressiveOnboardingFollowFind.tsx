import { Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import {
  PROGRESSIVE_ONBOARDING_FOLLOW_FIND,
  PROGRESSIVE_ONBOARDING_FOLLOW_HIGHLIGHT,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import {
  withProgressiveOnboardingCounts,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/withProgressiveOnboardingCounts"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC } from "react"

interface ProgressiveOnboardingFollowFindProps
  extends WithProgressiveOnboardingCountsProps {}

export const __ProgressiveOnboardingFollowFind__: FC<ProgressiveOnboardingFollowFindProps> = ({
  children,
  counts,
}) => {
  const { dismiss, isDismissed } = useProgressiveOnboarding()

  const isDisplayable =
    counts.followedArtists === 1 &&
    !isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_FIND).status

  const handleClose = () => {
    dismiss(PROGRESSIVE_ONBOARDING_FOLLOW_FIND)
  }

  const handleDismiss = () => {
    handleClose()
    dismiss(PROGRESSIVE_ONBOARDING_FOLLOW_HIGHLIGHT)
  }

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING_FOLLOW_FIND}
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
