import { Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import {
  PROGRESSIVE_ONBOARDING_FIND_FOLLOWS,
  PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT,
  useProgressiveOnboarding,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import {
  ProgressiveOnboardingCountsQueryRenderer,
  WithProgressiveOnboardingCountsProps,
} from "Components/ProgressiveOnboarding/ProgressiveOnboardingCounts"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC } from "react"

interface ProgressiveOnboardingFindFollowsProps
  extends WithProgressiveOnboardingCountsProps {}

const ProgressiveOnboardingFindFollows: FC<ProgressiveOnboardingFindFollowsProps> = ({
  children,
  counts,
}) => {
  const { dismiss, isDismissed, isEnabledFor } = useProgressiveOnboarding()

  const isDisplayable =
    isEnabledFor("follows") &&
    counts.followedArtists === 1 &&
    !isDismissed(PROGRESSIVE_ONBOARDING_FIND_FOLLOWS)

  const handleClose = () => {
    dismiss(PROGRESSIVE_ONBOARDING_FIND_FOLLOWS)
  }

  const handleDismiss = () => {
    handleClose()
    dismiss(PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT)
  }

  if (!isDisplayable) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      name={PROGRESSIVE_ONBOARDING_FIND_FOLLOWS}
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

export const ProgressiveOnboardingFindFollowsQueryRenderer: FC = ({
  children,
}) => {
  return (
    <ProgressiveOnboardingCountsQueryRenderer
      Component={ProgressiveOnboardingFindFollows}
    >
      {children}
    </ProgressiveOnboardingCountsQueryRenderer>
  )
}
