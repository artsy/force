import { Text } from "@artsy/palette"
import { useProgressiveOnboarding } from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { ProgressiveOnboardingPopover } from "Components/ProgressiveOnboarding/ProgressiveOnboardingPopover"
import { PROGRESSIVE_ONBOARDING_SAVE_ARTWORK } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveArtwork"
import { FC } from "react"

export const PROGRESSIVE_ONBOARDING_FIND_SAVES = "find-saves"

export const ProgressiveOnboardingFindSaves: FC = ({ children }) => {
  const { dismiss, isDismissed, enabled } = useProgressiveOnboarding()

  const handleClose = () => {
    dismiss(PROGRESSIVE_ONBOARDING_FIND_SAVES)
  }

  if (
    !enabled ||
    isDismissed(PROGRESSIVE_ONBOARDING_FIND_SAVES) ||
    !isDismissed(PROGRESSIVE_ONBOARDING_SAVE_ARTWORK)
  ) {
    return <>{children}</>
  }

  return (
    <ProgressiveOnboardingPopover
      placement="bottom-end"
      onClose={handleClose}
      ignoreClickOutside={false}
      popover={<Text variant="xs">Find and edit all your Saves here.</Text>}
    >
      {children}
    </ProgressiveOnboardingPopover>
  )
}
