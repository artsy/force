import { Text } from "@artsy/palette"
import { useProgressiveOnboarding } from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowArtist"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { FC } from "react"

export const PROGRESSIVE_ONBOARDING_FIND_FOLLOWS = "find-follows"

export const ProgressiveOnboardingFindFollows: FC = ({ children }) => {
  const { dismiss, isDismissed, enabled } = useProgressiveOnboarding()

  const handleClose = () => {
    dismiss(PROGRESSIVE_ONBOARDING_FIND_FOLLOWS)
  }

  if (
    !enabled ||
    isDismissed(PROGRESSIVE_ONBOARDING_FIND_FOLLOWS) ||
    !isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST)
  ) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      placement="bottom-end"
      onClose={handleClose}
      ignoreClickOutside={false}
      popover={<Text variant="xs">Find and edit all your Follows here.</Text>}
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}
